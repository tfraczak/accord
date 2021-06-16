class Api::MembershipsController < ApplicationController

    def index
        if params[:server_id]
            @memberships = Membership.where(joinable_id: params[:server_id], joinable_type: :Server)
        end
        render :index
    end

    def create
        if params[:server_id]
            @membership = Membership.new(membership_params)
            if @membership.save
                @server = Server.find_by(id: @membership.joinable_id)
                
                render :create

                if (membership_params[:user_id] != current_user.id) && (membership_params[:user_id] != @server.owner_id)
                    user = User.find_by(id: membership_params[:user_id])
                    member = secure_user!(camelize_record(user))
                    membership = camelize_record(@membership)
                    membership.delete("createdAt")
                    membership.delete("updatedAt")
                    socket = {}
                    socket["action"] = "new member"
                    socket["payload"] = { member: member, membership: membership }.as_json
                    ServerChannel.broadcast_to(@server, socket)
                end

            else
                case @membership.errors.full_messages
                when ["User has already been taken"]
                    render json: ["You're already a member!"], status: 409
                else
                    render json: @membership.errors.full_messages, status: 422
                end
            end
        end
    end

    def update
        @membership = Membership.find_by(id: params[:id])
        if @membership.update(local_username: membership_params[:local_username])
            render :update
        else
            render json: @membership.errors.full_messages, status: 422
        end
    end

    def destroy
        @membership = Membership.find_by(id: params[:id])
        if @membership
            joinable = @membership.joinable
            @server = joinable if joinable.class.to_s == "Server"
            @conversation = joinable if joinable.class.to_s == "Conversation"
            if @server
                @channel_ids = @server.channels.pluck(:id)
                @invitation_ids = @server.invitations.pluck(:id)
                @membership_ids = @server.memberships.pluck(:id)
                @message_ids = @server.messages.pluck(:id)
                @server_id = @server.id
            end
            @membership.destroy
            if @membership.user_id != current_user.id
                @user = User.find_by(id: @membership.user_id)
                render "/api/users/show"
            else
                render :destroy
            end
        else
            render json: ["User doesn't belong to this server."], status: 422
        end
    end

    private

    def local_username_valid?
        membership_params[:local_username] && !membership_params[:local_username].empty?
    end

    def local_username_empty?
        !membership_params[:local_username] || membership_params[:local_username].empty?
    end

    def illegal_update?
        !membership_params[:user_id] &&
        !membership_params[:joinable_id] &&
        !membership_params[:joinable_type]
    end

    def local_username_param
        membership_params[:local_username]
    end

end