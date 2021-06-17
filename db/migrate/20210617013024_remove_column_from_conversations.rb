class RemoveColumnFromConversations < ActiveRecord::Migration[5.2]
  def change
    remove_column :conversations, :is_group
  end
end
