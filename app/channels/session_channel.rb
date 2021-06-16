class SessionChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find_by(id: params[:currentUserId])
    stream_for @user if @user
  end

  def self.current_user
    @user
  end

  def new_convo(data)
    socket = {}
    socket['action'] = "new conversation"
    convo = Conversation.new(initiator_id: @user.id, name: "")
    if convo.save
      user_ids = [@user.id, data["userId"]]
      users = user_ids.map { |user_id| User.find_by(id: user_id) }

      users_json = Hash[users.map { |user| [user.id, secure_user!(camelize_keys(user.attributes))] }]
      memberships = camelize(convo.create_memberships(user_ids))
      convo_json = camelize_keys(convo.attributes)

      socket["payload"] = {
        users: users_json,
        memberships: memberships,
        conversation: convo_json
      }.as_json

      users.each { |user| SessionChannel.broadcast_to(user, socket) }

    end
  end

end