json.set! :servers do
    @servers.each do |server|
        json.set! server.id do
            json.partial! 'api/servers/server', server: server
        end
    end
end

json.set! :users do
    @servers.each do |server|
        server.members.each do |member|
            json.set! member.id do
                json.partial! 'api/users/user', user: member
            end
        end
    end
end

json.set! :memberships do
    @servers.each do |server|
        server.memberships.each do |membership|
            json.set! membership.id do
                json.partial! "api/memberships/membership", membership: membership
            end
        end
    end
end

invitations = []
@servers.each { |server| invitations = invitations.concat(server.invitations) }

if invitations.empty?
    json.set! :invitations, {}
else
    json.set! :invitations do
        invitations.each do |invitation|
            json.set! invitation.id do
                json.partial! "api/invitations/invitation", invitation: invitation
            end
        end
    end
end

channels = []
messages = []
@servers.each { |server| channels = channels.concat(server.channels) }

if channels.empty?
    json.set! :channels, {}
else
    json.set! :channels do
        channels.each do |channel|
            json.set! channel.id do
                json.partial! "api/channels/channel", channel: channel
            end
            messages = messages.concat(
                Message
                    .where(messageable_type: :Channel, messageable_id: channel.id)
                    .order(created_at: :desc)
                    .limit(50)
            )
        end
    end
end

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