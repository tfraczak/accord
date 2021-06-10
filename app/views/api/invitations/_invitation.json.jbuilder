if invitation.expiration
    exp_date =  invitation.created_at + (invitation.expiration * 3600)
    is_expired = Time.now.utc > exp_date
    json.extract! invitation, :id, :server_id, :url_token
    json.set! :is_expired, is_expired
else
    json.extract! invitation, :id, :server_id, :url_token
    json.set! :is_expired, false
end