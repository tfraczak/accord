json.set! :channel do
    json.partial! "api/channels/channel", channel: @channel
end

json.set! :messages do
    messages = Message
            .where(messageable_type: :Channel, messageable_id: @channel.id)
            .order(created_at: :desc)
            .limit(50)
    messages.each do |message|
        json.set! message.id do
            json.partial! "api/messages/message", message: message
        end
    end
end