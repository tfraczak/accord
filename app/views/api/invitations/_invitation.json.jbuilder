if invitation.expiration
    exp_date =  invitation.created_at + (invitation.expiration * 3600)
    is_expired = Time.now.utc > exp_date
    json.extract! invitation, :id, :url_path
    json.set! :is_expired, is_expired
else
    json.extract! invitation, :id, :url_path
    json.set! :is_expired, false
end