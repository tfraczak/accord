class ChatChannel < ApplicationCable::Channel
  def subscribed
    chat_type = params[:type]
    @chat = chat_type.constantize.find_by(id: params[:chatId])
    stream_for @chat if @chat
  end

  def speak(data) # create action equivalent?
    @message = Message.new(data['message'])
    if @message.save
      socket = build_message_socket("new message")
      if @chat.class.to_s == "Conversation"
        receiver = @chat.receiver
        initiator = @chat.initiator
        ids = @chat.members.pluck(:id)
        unless ids.include?(receiver.id)
          membership = @chat.create_membership(@chat.receiver_id)
          memberships = [*@chat.memberships]
          memberships << membership
          convo_socket = build_convo_socket("initiate conversation")
          SessionChannel.broadcast_to(receiver, convo_socket)
          convo_socket["payload"]["messages"] = {}
          SessionChannel.broadcast_to(initiator, convo_socket)
        end

      end

      ChatChannel.broadcast_to(@chat, socket)
      
    end
  end

  def update(data)
    @message = Message.find_by(id: data['message']['id'])
    if @message.update(body: data['message']['body'])
      socket = build_message_socket("update message")

      ChatChannel.broadcast_to(@chat, socket)
      
    end
  end

  def load
    socket = {}
    socket["action"] = "load"
    messages = Message
      .where(messageable_type: @chat.class.to_s, messageable_id: @chat.id)
      .order(created_at: :desc)
      .limit(50)
    messages.each { |message| message[:author] = secure_user!(camelize_keys(message.author.attributes)) }
    socket["messages"] = camelize(messages)
    ChatChannel.broadcast_to(@chat, socket)
  end

  def unsubscribed
    
  end

  def self.unsubscribe(chan)
    stop_stream_for(chan)
  end

  private

  def build_convo_socket(action)
    convo_socket = {}
    convo_socket["payload"] = {}
    convo_socket["action"] = action
    convo_socket["payload"]["conversation"] = camelize_keys(@chat.attributes)
    convo_socket["payload"]["memberships"] = format_records(@chat.memberships)
    convo_socket["payload"]["messages"] = formatted_messages
    convo_socket
  end

  def formatted_messages
    messages = @chat.messages.order(created_at: :desc).limit(50)
    msgs = messages.map do |message|
      formatted_message = camelize_keys(message.attributes)
      author = message.author
      formatted_message["author"] = secure_user!(camelize_keys(author.attributes))
      [message.id, formatted_message]
    end
    Hash[msgs]
  end

  def build_message_socket(action)
    socket = { message: camelize_keys(@message.attributes) }
    author = camelize_keys(@message.author.attributes)
    socket[:message]["author"] = secure_user!(author)
    socket[:message]["author"]["localUsername"] = @message.local_username if @chat.class.to_s == "Channel"
    socket[:message]["author"]["membershipId"] = @message.membership.id
    socket[:action] = action
    socket
  end

end
