class ChatChannel < ApplicationCable::Channel
  def subscribed
    chat_type = params[:type]
    @chat = chat_type.constantize.find_by(id: params[:chatId])
    stream_for @chat if @chat
  end

  def speak(data) # create action equivalent?
    @message = Message.new(data['message'])
    if @message.save
      socket = { message: camelize_keys(@message.attributes) }
      ChatChannel.broadcast_to(@chat, socket)
    end
  end

  def load
    messages = Message
      .where(messageable_type: @chat.class.to_s, messageable_id: @chat.id)
      .order(created_at: :desc)
      .limit(20)
    messages.reverse!
    data = { messages: camelize(messages) }
    ChatChannel.broadcast_to(@chat, data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def camelize(objects)
    objects.map { |object| camelize_keys(object.attributes) }
  end

  def camelize_keys(hash)
    pairs = hash.map { |key, value| [key.camelize(:lower), value] }
    Hash[pairs]
  end

end