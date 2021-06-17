if @found
  json.partial! "api/conversations/conversation", convo: @convo
else
  json.set! :conversation do
    json.partial! "api/conversations/conversation", convo: @convo
  end
  json.set! :membership do
    json.partial! "api/memberships/membership", membership: @convo.memberships.first
  end
end