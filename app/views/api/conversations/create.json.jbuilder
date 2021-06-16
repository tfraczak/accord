if @found
  json.partial! "api/conversations/conversation", conversation: @convo
else
  json.set! :conversation do
    json.partial! "api/conversations/conversation", conversation: @convo
  end
  json.set! :memberships do
    @memberships.each do |membership|
      json.set! membership.id do
        json.partial! "api/memberships/conversation", membership: membership
      end
    end
  end
end