json.extract! message, :id, :body, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at
json.author do
  json.partial! "/api/users/user", user: message.author
  json.localUsername message.local_username
  json.membershipId message.membership ? message.membership.id : nil
end