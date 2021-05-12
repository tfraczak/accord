class RemoveUsersIdFromServers < ActiveRecord::Migration[5.2]
  def change
    remove_column :servers, :user_id
  end
end
