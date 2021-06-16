module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def camelize(objects)
      objects.map { |object| camelize_keys(object.attributes) }
    end

    def camelize_users(users)
      users.map { |user| secure_user!(camelize_keys(user.attributes)) }
    end
  
    def camelize_keys(hash)
      pairs = hash.map { |key, value| [key.camelize(:lower), value] }
      Hash[pairs]
    end

    def snakecase_keys(hash)
      pairs = hash.map { |key, value| [key.to_s.underscore.to_sym, value] }
      Hash[pairs]
    end

    def secure_user!(user)
      user.delete("email")
      user.delete("passwordDigest")
      user.delete("sessionToken")
      user.delete("createdAt")
      user.delete("updatedAt")
      user
    end

    def server_socket(action, membership=nil, user=nil, current_user_id=nil)
      socket = {}
      socket["action"] = action
      socket["payload"] = {
        channel_ids: @server.channels.pluck(:id),
        invitation_ids: @server.invitations.pluck(:id),
        membership_ids: @server.memberships.pluck(:id),
        message_ids: @server.messages.pluck(:id),
        server_id: @server.id,
      }

      socket["payload"]["membership_id"] = membership.id if membership
      socket["payload"]["user_id"] = user.id if user
      socket["payload"]["current_user_id"] = current_user_id if current_user_id

      socket["payload"] = camelize_keys(socket["payload"].as_json)
      socket
    end

  end
end
