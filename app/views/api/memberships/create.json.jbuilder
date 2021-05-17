json.set! :membership do
    json.partial! "api/memberships/membership", membership: @membership
end


if @server
    json.set! @membership.joinable_type.downcase do
        json.partial! 'api/servers/server', server: @server
    end
end

# if @conversation
#     json.set! @membership.joinable_type.downcase do
#         json.partial! 'api/conversations/conversation', server: @conversation
#     end
# end