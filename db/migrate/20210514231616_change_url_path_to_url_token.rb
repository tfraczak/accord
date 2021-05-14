class ChangeUrlPathToUrlToken < ActiveRecord::Migration[5.2]
  def change
    rename_column :invitations, :url_path, :url_token
  end
end
