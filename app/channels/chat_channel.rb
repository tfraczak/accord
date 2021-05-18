class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "some_channel"
  end

  def speak(data)
    message = Message.create(
      body: data['message'],
      messageable_type: data['messageable_type'],
      messageable_id: data['messageable_id'],
      author_id: data['author_id']
    )
    socket = { message: {
        id: message.id,
        body: message.body,
        author_id: message.author_id,
        messageable_id: message.messageable_id,
        messageable_type: message.messageable_type,
        created_at: message.created_at
      }
    }
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
