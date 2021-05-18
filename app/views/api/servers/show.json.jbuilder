
if @channel && @membership
    json.set! :server do
        json.partial! 'api/servers/server', server: @server
    end
    json.set! :channel do
        json.partial! 'api/channels/channel', channel: @channel
    end
    json.set! :membership do
        json.partial! 'api/memberships/membership', membership: @membership
    end
else
    json.partial! 'api/servers/server', server: @server
end