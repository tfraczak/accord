json.set! :channel do
    json.partial! "api/channels/channel", channel: @channel
end

messages = []
messages = Message
    .where(messageable_type: :Channel, messageable_id: @channel.id)
    .order(created_at: :desc)
    .limit(50)
if messages.empty?
    json.set! :messages, {}
else
    json.set! :messages do
        messages.each do |message|
            json.set! message.id do
                json.partial! "api/messages/message", message: message
            end
        end
    end
end