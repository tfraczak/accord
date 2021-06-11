@invitations.each do |invite|
    json.set! invite.id do
        json.partial! 'api/invitations/invitation', invitation: invite
    end
end