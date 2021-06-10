class MembershipsAddNullFalseToUserId < ActiveRecord::Migration[5.2]
  def change
    change_column_null :memberships, :user_id, false
  end
end
