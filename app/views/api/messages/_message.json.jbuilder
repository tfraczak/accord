json.extract! message, :id, :body, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at
json.author do
  json.partial! "/api/users/user", user: User.find_by(id: message.author_id)
end