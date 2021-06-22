class Api::ServersController < ApplicationController

    def index
        if params[:user_id]
            user = User.find_by(id: params[:user_id])
            @servers = user.joined_servers
        else
            @servers = Server.find_by(server_params)
        end
        render :index
    end

    def show
        @server = Server.find_by(id: params[:id])
        if @server
            render :show
        else
            render json: {}
        end
    end

    def create
        @server = Server.new(server_params)
        if @server.save
            if @server.image.attached?
                @server.image_url = url_for(@server.image)
                @server.save
            end
            @channel = Channel.find_by(server_id: @server.id)
            @membership = Membership.find_by(joinable_id: @server.id, joinable_type: :Server, user_id: current_user.id)
            render :create
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def update
        @server = Server.find_by(id: params[:id])
        if @server.image.attached? && ((server_params[:image_url] == "") || server_params[:image])
            @server.image.purge
            @server.image_url = ""
        end
        if @server && @server.update(server_params)
            socket = {}
            socket['action'] = "update server"
            if @server.image.attached? && (@server.image_url === "")
                @server.image_url = url_for(@server.image)
                @server.save
            end
            socket['server'] = camelize_record(@server)
            ServerChannel.broadcast_to(@server, socket)
            # render :update
        elsif !@server
            render json: ["Server doesn't exist"], status: 404
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def destroy
        @server = Server.find_by(id: params[:id])
        if @server
            @channel_ids = @server.channels.pluck(:id)
            @invitation_ids = @server.invitations.pluck(:id)
            @membership_ids = @server.memberships.pluck(:id)
            @message_ids = @server.messages.pluck(:id)
            user_ids = @server.members.pluck(:id)
            @server_id = @server.id

            

            @server.destroy

            user_ids = user_ids.select { |id| id != current_user.id }
            users = user_ids.map { |id| User.find_by(id: id) }
            
            socket = build_delete_socket!

            users.each { |user| SessionChannel.broadcast_to(user, socket) }

            render :destroy
        else
            render json: ["Server doesn't exist."], status: 404
        end
    end

    private

    def build_delete_socket!
        socket = {}
        socket["action"] = "remove_server"
        socket["payload"] = {}
        socket["payload"]["channelIds"] = @channel_ids
        socket["payload"]["invitationIds"] = @invitation_ids
        socket["payload"]["membershipIds"] = @membership_ids
        socket["payload"]["messageIds"] = @message_ids
        socket["payload"]["serverId"] = @server_id
        socket
    end

end