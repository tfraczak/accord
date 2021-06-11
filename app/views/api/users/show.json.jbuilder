if @membership
  json.set! :member do 
    json.partial! 'api/users/user', user: @user
  end
  json.set! :membership do 
    json.partial! 'api/memberships/membership', membership: @membership
  end
else
  json.partial! 'api/users/user', user: @user
end