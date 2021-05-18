class Api::MessagesController < ApplicationController

    def index
        if params[:channel_id]
            @channel = Channel.find_by(id: params[:channel_id])
            @messages = @channel.messages
            render :index
        end
    end

    def create
        @message = Message.new(message_params)
        if @message.save
            render :show
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def update

    end

    def destroy

    end

end