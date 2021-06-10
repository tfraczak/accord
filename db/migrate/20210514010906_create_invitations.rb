class CreateInvitations < ActiveRecord::Migration[5.2]
  def change
    create_table :invitations do |t|
      t.string :url_path
      t.references :server, references: :servers, foreign_key: true, null: false
      t.integer :expiration, null: false
      t.timestamps
    end
    add_index :invitations, :url_path, unique: true
  end
end
