class CreateMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :memberships do |t|
      t.references :user, references: :users, foreign_key: true
      t.string :local_username
      t.references :joinable, null: false, polymorphic: true
      t.timestamps
    end
    add_index :memberships, [:user_id, :joinable_id, :joinable_type], name: "unique_membership_index"
  end
end
