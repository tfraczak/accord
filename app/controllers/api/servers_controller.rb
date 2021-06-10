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
            @channel = Channel.find_by(server_id: @server.id)
            @membership = Membership.find_by(joinable_id: @server.id, joinable_type: :Server, user_id: current_user.id)
            render :create
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def update
        @server = Server.find_by(id: params[:id])
        if @server && @server.update(server_params)
            render :update
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
            @server_id = @server.id
            @server.destroy
            render :destroy
        else
            render json: ["Server doesn't exist."], status: 404
        end
    end

end