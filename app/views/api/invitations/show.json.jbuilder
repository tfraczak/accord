if @invitation
    json.partial! 'api/invitations/invitation', invitation: @invitation
end

if @server
    json.partial! 'api/servers/server', server: @server
end
