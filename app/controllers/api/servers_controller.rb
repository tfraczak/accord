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

    def create
        @server = Server.new(server_params)
        if @server.save
            @channel = Channel.find_by(server_id: @server.id)
            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def update
        @server = Server.find_by(id: params[:serverId])
        if @server && @server.update(server_params)
            render :show
        elsif !@server
            render json: ["Server doesn't exist"], status: 404
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def destroy
        @server = Server.find_by(id: params[:id])
        if @server
            @server.destroy
            render json: @server
        else
            render json: ["Server doesn't exist."], status: 404
        end
    end

end