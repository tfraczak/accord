json.set! :server do
    json.partial! 'api/servers/server', server: @server
end

json.set! :users do
    @server.members.each do |member|
        json.set! member.id do
            json.partial! 'api/users/user', user: member
        end
    end
end

json.set! :memberships do
    @server.memberships.each do |membership|
        json.set! membership.id do
            json.partial! "api/memberships/membership", membership: membership
        end
    end
end

json.set! :invitations do
    @server.invitations.each do |invitation|
        json.set! invitation.id do
            json.partial! "api/invitations/invitation", invitation: invitation
        end
    end
end

json.set! :channels do
    @server.channels.each do |channel|
        json.set! channel.id do
            json.partial! "api/channels/channel", channel: channel
        end
    end
end

json.set! :messages do
    @server.channels.each do |channel|
        messages = Message
            .where(messageable_type: :Channel, messageable_id: channel.id)
            .order(created_at: :desc)
            .limit(50)
        messages.each do |message|
            json.set! message.id do
                json.partial! "api/messages/message", message: message
            end
        end
    end
end