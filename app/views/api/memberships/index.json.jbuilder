@memberships.each do |membership|
    json.set! membership.joinable_type do
        json.set! membership.joinable_id do
            json.set! membership.user_id do
                json.partial! "api/memberships/membership", memerbship: membership
            end
        end
    end
end