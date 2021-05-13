if @user
    json.set! @user.id do
        json.partial! 'api/memberships/user', user: @user, membership: @membership 
    end
end

if @server
    json.partial! 'api/servers/server', server: @server
end