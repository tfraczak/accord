class AddColumnToInvitations < ActiveRecord::Migration[5.2]
  def change
    add_reference :invitations, :inviter, references: :users, index: true
  end
end
