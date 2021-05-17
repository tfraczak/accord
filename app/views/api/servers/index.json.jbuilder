json.set! :servers do
    @servers.each do |server|
        json.set! server.id do
            json.partial! 'api/servers/server', server: server
            json.set! :memberships do
                server.memberships.each do |membership|
                    json.set! membership.user.id do
                        json.extract! membership, :id, :local_username
                    end
                end
            end
        end
    end
end

json.set! :users do
    @servers.each do |server|
        server.members.each do |member|
            json.set! member.id do
                json.extract! member, :id, :username, :username_id, :avatar_url
            end
        end
    end
end

