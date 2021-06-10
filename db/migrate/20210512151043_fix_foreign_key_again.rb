class FixForeignKeyAgain < ActiveRecord::Migration[5.2]
  def change
    remove_index :servers, :user_id
    remove_foreign_key :servers, column: :user_id
    remove_column :servers, :owner_id
    add_reference :servers, :owner, foreign_key: { to_table: :users }
  end
end
