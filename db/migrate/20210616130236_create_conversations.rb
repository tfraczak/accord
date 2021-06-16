class CreateConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations do |t|
      t.references :initiator, references: :users, foreign_key: { to_table: :users }, null: false
      t.timestamps
    end
  end
end
