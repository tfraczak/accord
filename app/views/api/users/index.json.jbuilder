@users.each do |user|
    membership = Membership.find_by(
        user_id: user.id,
        joinable_id: @server_id,
        joinable_type: @type
    )
    json.set! user.id do
        json.partial! 'api/users/user', user: user
        json.set! :membershipId, membership.id
        json.set! :localUsername, membership.local_username
    end
end