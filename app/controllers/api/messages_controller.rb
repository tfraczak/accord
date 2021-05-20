class Api::MessagesController < ApplicationController

    def index
        if params[:channel_id]
            channel = Channel.find_by(id: params[:channel_id])
            @messages = Message
                .where(messageable_type: :Channel, messageable_id: channel.id)
                .order(created_at: :desc)
                .limit(50)
            @messages.reverse!
            render :index
        else
            conversation = Conversation.find_by(id: params[:conversation_id])
            @messages = Message
                .where(messageable_type: :Conversation, messageable_id: conversation.id)
                .order(:created_at)
                .limit(50)
            render :index
        end
    end

    def create
        @message = Message.new(message_params)
        chat_type = @message.messageable_type
        @chat = chat_type.constantize.find_by(id: @message.messageable_id)
        if @chat && @message.save
            ChatChannel.broadcast_to(@chat, serialize(@message)
            render :show
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def update

    end

    def destroy

    end

    private

    def serialize(obj)
        json = obj.as_json
        json.delete("updated_at")
        json
    end

end