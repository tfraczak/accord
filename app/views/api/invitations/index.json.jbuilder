@invitations.each do |invite|
    json.set! invite.server_id do
        json.partial! 'api/invitations/invitation', invitation: invite
    end
end