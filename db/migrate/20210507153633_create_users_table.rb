class CreateUsersTable < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string "email", null: false
      t.string "username", null: false
      t.integer "username_id", null: false
      t.string "avatar_url"
      t.string "password_digest", null: false
      t.string "session_token", null: false
      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, [:username, :username_id], unique: true, name: "unique_username_by_uid"
  end
end
