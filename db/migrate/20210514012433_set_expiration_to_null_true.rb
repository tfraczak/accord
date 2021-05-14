class SetExpirationToNullTrue < ActiveRecord::Migration[5.2]
  def change
    change_column_null :invitations, :expiration, true
  end
end
