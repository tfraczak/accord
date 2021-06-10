class FixMembershipsIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :memberships, [:user_id, :joinable_id, :joinable_type]
    add_index :memberships, [:user_id, :joinable_id, :joinable_type], name: "unique_membership_index", unique: true
  end
end
