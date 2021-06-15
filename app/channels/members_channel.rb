class MembersChannel < ApplicationCable::Channel
  def subscribed
    @type = params["type"]
    @joinable = @type.constantize.find_by(id: params[:id])
    if @joinable
      @members_list = "members-list-#{@joinable.id}-#{@type}"
      stream_for @members_list
    end
  end

  def new_member(data)
    user = User.find_by(id: data['member'].id)
    if user
      membership = Membership.find_by(joinable_id: @joinable.id, joinable_type: @type, user_id: user.id)
      socket = {}
      payload = { 
        membership: camelize_keys(membership.attributes),
        member: secure_user!(camelize_keys(user.attributes))
      }
      action = "new member"
      socket['action'] = action
      socket['payload'] = payload
      MembersChannel.broadcast_to(@members_list, socket)
    end
  end

  def load
    socket = {}
    socket['action'] = 'load'
    socket['payload'] = {
      members: camelize_users(@joinable.members),
      memberships: camelize(@joinable.memberships)
    MembersChannel.broadcast_to(@members_list, socket)
  end

  def unsubscribed
    # for clean up if necessary
  end

end