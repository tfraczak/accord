json.set! membership.joinable_id do
    json.set! membership.user_id do
        json.extract! membership, :id, :user_id, :joinable_id, :joinable_type, :local_username
    end
end

