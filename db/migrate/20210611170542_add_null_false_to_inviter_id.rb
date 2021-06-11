class AddNullFalseToInviterId < ActiveRecord::Migration[5.2]
  def change
    change_column_null :invitations, :inviter_id, false
  end
end
