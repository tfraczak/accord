class AddColumnToConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :receiver_id, :bigint, null: false
    add_foreign_key :conversations, :users, column: :receiver_id
  end
end
