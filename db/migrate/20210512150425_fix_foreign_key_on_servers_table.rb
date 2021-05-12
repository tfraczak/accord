class FixForeignKeyOnServersTable < ActiveRecord::Migration[5.2]
  def change
    remove_index :servers, :owner_id
    remove_foreign_key :servers, column: :owner_id
    add_reference :servers, :user, as: :owner, foreign_key: true 
  end
end
