json.set! user.id do
    json.partial! 'api/users/user', user: user
    json.set! :membershipId, membership.id
    json.set! :localUsername, membership.local_username
end