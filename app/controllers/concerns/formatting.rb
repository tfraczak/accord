module Formatting
  
  private

  def camelize(objects)
    objects.map { |object| camelize_keys(object.attributes) }
  end

  def camelize_record(record)
    pairs = record.attributes.map { |key, value| [key.camelize(:lower), value] }
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