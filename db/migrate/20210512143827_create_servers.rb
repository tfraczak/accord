class CreateServers < ActiveRecord::Migration[5.2]
  def change
    create_table :servers do |t|
      t.string :name, null: false
      t.string :image_url
      t.references :owner, references: :users, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
