class ChatChannel < ApplicationCable::Channel
  def subscribed
    chat_type = params[:type]
    @chat = chat_type.constantize.find_by(id: params[:chatId])
    stream_for @chat if @chat
  end

  def speak(data) # create action equivalent?
    @message = Message.new(data['message'])
    if @message.save
      socket = { 
        message: {
          id: @message.id,
          body: @message.body,
          authorId: @message.author_id,
          messageableId: @message.messageable_id,
          messageableType: @message.messageable_type,
          createdAt: @message.created_at
        }
      }
      ChatChannel.broadcast_to(@chat, socket)
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
