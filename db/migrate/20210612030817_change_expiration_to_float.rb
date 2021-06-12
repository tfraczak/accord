class ChangeExpirationToFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :invitations, :expiration, :float
  end
end
