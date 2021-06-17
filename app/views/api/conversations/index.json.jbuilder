json.set! :conversations do
  @conversations.each do |convo|
      json.set! convo.id do
          json.partial! 'api/conversations/conversation', convo: convo
      end
  end
end

json.set! :members do
  @conversations.each do |convo|
      convo.members.each do |member|
          json.set! member.id do
              json.partial! 'api/users/user', user: member
          end
      end
  end
end

json.set! :memberships do
  @conversations.each do |convo|
      convo.memberships.each do |membership|
          json.set! membership.id do
              json.partial! "api/memberships/membership", membership: membership
          end
      end
  end
end

messages = []
@conversations.each do |convo|
  membership = Membership.find_by(
    joinable_id: convo.id,
    joinable_type: :Conversation,
    user_id: current_user.id,
  )
  messages = messages.concat(
    convo.messages
      .where("messages.created_at > ?", membership.created_at)
      .order(created_at: :desc)
      .limit(50)
  )
end
if messages.empty?
  json.set! :messages, {}
else
  json.set! :messages do
    messages.each do |message|
      json.set! message.id do
        json.partial! "api/messages/message", message: message
      end
    end
  end
end
