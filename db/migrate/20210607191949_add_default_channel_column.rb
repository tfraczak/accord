class AddDefaultChannelColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :default, :boolean
    add_index :channels, [:server_id, :default], unique: true, name: "unique_default_channel"
  end
end
