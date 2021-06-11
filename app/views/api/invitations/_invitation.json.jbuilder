if invitation.expiration
    exp_date = invitation.created_at + (invitation.expiration * 3600) 
    is_expired = Time.now.utc > exp_date
else
    is_expired = false
end
json.extract! invitation, :id, :server_id, :url_token, :expiration, :created_at
json.set! :is_expired, is_expired

inviter = invitation.inviter
json.inviter do
    json.partial! "api/users/user", user: inviter
end