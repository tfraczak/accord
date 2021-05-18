class ChangeColumnOnChannelsTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :channels, :type, :media_type
  end
end
