
if @channel
    json.set! :server do
        json.partial! 'api/servers/server', server: @server
    end
    json.set! :channel do
        json.partial! 'api/channels/channel', channel: @channel
    end
else
    json.partial! 'api/servers/server', server: @server
end