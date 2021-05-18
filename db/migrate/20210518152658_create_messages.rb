class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :body, null: false
      t.references :author, references: :users, foreign_key: { to_table: :users }, null: false
      t.references :messageable, null: false, polymorphic: true
      t.timestamps
    end
    add_index :messages, [:messageable_id, :messageable_type]
  end
end
