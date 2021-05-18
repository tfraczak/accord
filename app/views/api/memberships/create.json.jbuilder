json.set! :membership do
    json.partial! "api/memberships/membership", membership: @membership
end


if @server
    json.set! @membership.joinable_type.downcase do
        json.partial! 'api/servers/server', server: @server
    end
end

if @channels
    json.set! :channels do
        @channels.each do |channel|
            json.set! channel.id do
                json.partial! 'api/channels/channel', channel: channel
            end
        end
    end
end

if @members
    json.set! :users do
        @members.each do |member|
            json.set! member.id do
                json.partial! 'api/users/user', user: member
            end
        end
    end
end

# if @conversation
#     json.set! @membership.joinable_type.downcase do
#         json.partial! 'api/conversations/conversation', server: @conversation
#     end
# end