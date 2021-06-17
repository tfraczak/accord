json.set! :conversation do
  json.partial! "api/conversations/conversation", convo: @convo
end

json.set! :members do
  @convo.members.each do |member|
    json.set! member.id do
      json.partial! "api/users/user", user: member
    end
  end
end

json.set! :memberships do
  @convo.memberships.each do |membership|
    json.set! membership.id do
      json.partial! "api/memberships/membership", membership: membership
    end
  end
end

membership = Membership.find_by(
  joinable_id: @convo.id,
  joinable_type: :Conversation,
  user_id: current_user.id,
)
messages = @convo.messages
  .where("messages.created_at > ?", membership.created_at)
  .order(created_at: :desc)
  .limit(50)

if messages.empty?
  json.set! :messages, {}
else
  json.set! :messages do
    messages.each do |message|
      json.set! message.id do
        json.partial! 'api/messages/message', message: message
      end
    end
  end
end