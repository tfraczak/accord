class AddColumnToConversationsTableOnlyTwo < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :is_group, :boolean, null: false
  end
end
