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
  end
end
