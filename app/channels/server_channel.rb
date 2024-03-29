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

    if server && server.update(updatedInfo)
      socket["server"] = camelize_keys(server.attributes)
      ServerChannel.broadcast_to(@server, socket)
    end

  end
  
  def delete_server

    socket = server_socket("delete server")

    ServerChannel.broadcast_to(@server, socket)
    stop_all_streams
    
    @server.destroy
  end
  

  def leave_server(data)
    user = User.find_by(id: data["currentUserId"])
    if user
      membership = Membership.find_by(id: data["membershipId"])

      if membership
        socket = server_socket("leave server", membership, user)
        membership.destroy
        ServerChannel.broadcast_to(@server, socket)
      else
        socket["error"] = ["You are not a member."]
        ServerChannel.broadcast_to(@server, socket)
      end

    else
      socket["error"] = ["You do not exist??"]
      ServerChannel.broadcast_to(@server, socket)
    end
  end

  def kick_member(data)
    user = User.find_by(id: data["member"]["id"])
    if user
      membership = Membership.find_by(id: data["member"]["membershipId"])

      if membership
        socket = server_socket("kick member", membership, user, data["currentUserId"])
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

  def update_nickname(data)
    socket = {}
    socket["action"] = "update nickname"
    user = User.find_by(id: data["membership"]["userId"])
    if user
      membership = Membership.find_by(user_id: user.id, joinable_id: @server.id, joinable_type: :Server)
      if membership && membership.update(snakecase_keys(data["membership"]))
        socket["membership"] = camelize_keys(membership.attributes)
        socket["membership"].delete("createdAt")
        socket["membership"].delete("updatedAt")

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

  def new_channel(data)
    socket = {}
    socket["action"] = "new channel"
    chan = Channel.new(snakecase_keys(data["channel"]))
    if chan.save
      socket["channel"] = camelize_keys(chan.attributes)
      ServerChannel.broadcast_to(@server, socket)
    end
  end

  def update_channel(data)
    socket = {}
    socket["action"] = "update channel"
    socket["payload"] = {}
    chan = Channel.find_by(id: data["channel"]["id"])
    if chan && chan.update(snakecase_keys(data["channel"]))
      socket["payload"]["channel"] = camelize_keys(chan.attributes)
      messages = Message
        .where(messageable_type: "Channel", messageable_id: chan.id)
        .order(created_at: :desc)
        .limit(50)
      messages.each { |message| message[:author] = secure_user!(camelize_keys(message.author.attributes)) }
      socket["payload"]["messages"] = messages
      ServerChannel.broadcast_to(@server, socket)
    else
      socket["error"] = ["This channel does not exist."]
      ServerChannel.broadcast_to(@server, socket)
    end
  end

  def delete_channel(data)
    socket = {}
    socket["action"] = "delete channel"
    chan = Channel.find_by(id: data["channel"]["id"])
    if chan
      socket["channel"] = camelize_keys(chan.attributes)
      # ChatChannel.unsubscribe(chan)
      chan.destroy
      ServerChannel.broadcast_to(@server, socket)
    else
      socket["error"] = ["This channel does not exist."]
      ServerChannel.broadcast_to(@server, socket)
    end
  end

  def create_invite(data)
    socket = {}
    socket["action"] = "create invite"
    invite = Invitation.new(snakecase_keys(data["invite"]))
    if invite.save
      socket["invite"] = camelize_keys(invite.attributes)
      socket["invite"]["inviter"] = secure_user!(camelize_keys(invite.inviter.attributes))
      ServerChannel.broadcast_to(@server, socket)
    end
  end

  def unsubscribed

  end

end