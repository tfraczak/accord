class Api::UsersController < ApplicationController

    def index
        if params[:server_id]
            server = Server.find_by(id: params[:server_id])
            @server_id = params[:server_id]
            @type = :Server
            @users = server.members
        elsif params[:conversation_id]
            conversation = Conversation.find_by(id: params[:conversation_id])
            @conversation_id = params[:conversation_id]
            @type = :Conversation
            @users = conversation.members
        end
        render :index
    end

    def show
        @user = User.find_by(id: params[:id])
        render :show
    end
    
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

end