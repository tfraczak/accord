class ServerChannel < ApplicationCable::Channel
  def subscribed
     @server = Server.find_by(id: params[:serverId])
     stream_for @server if @server
  end

  

  def update_server(data)
    
    socket = {}
    socket["action"] = "update server"
    server = Server.find_by(id: data["server"]["id"])
    updatedInfo = snakecase_keys(data["server"])
    return
    return
    if server && server.update(updatedInfo)
      socket["server"] = camelize_keys(server.attributes)
      ServerChannel.broadcast_to(@server, socket)
    end
  end

  def new_member(data)
    user = User.find_by(id: data["member"]["id"])
    if user
      membership = Membership.find_by(joinable_id: @server.id, joinable_type: :Server, user_id: user.id)
      socket = {}
      payload = { 
        membership: camelize_keys(membership.attributes),
        member: secure_user!(camelize_keys(user.attributes))
      }
      action = "new member"
      socket['action'] = action
      socket['payload'] = payload
      
      ServerChannel.broadcast_to(@server, socket)
    end
  end

  def kick_member(data)
    socket = {}
    socket["action"] = "kick member"
    user = User.find_by(id: data["member"]["id"])
    if user
      membership = Membership.find_by(id: data["member"]["membershipId"])
      if membership
        socket["payload"] = {
          membership_id: membership.id,
          channel_ids: @server.channels.pluck(:id),
          invitation_ids: @server.invitations.pluck(:id),
          membership_ids: @server.memberships.pluck(:id),
          message_ids: @server.messages.pluck(:id),
          server_id: @server.id,
          user_id: user.id,
        }
        socket["payload"] = camelize_keys(socket["payload"].as_json)
        
        membership.destroy
        ServerChannel.broadcast_to(@server, socket)
      else
        socket["error"] = ["User is not a member."]
        ServerChannel.broadcast_to(@server, socket)
      end

    else
      socket["error"] = ["User does not exist."]
      ServerChannel.broadcast_to(@server, socket)
    end
  end

  def unsubscribed
    # for clean up if necessary
  end

end