class RemoveColumnsFromUsersTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :password_digest, :session_token
  end
end
