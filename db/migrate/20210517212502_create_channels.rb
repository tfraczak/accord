class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.string :type, null: false
      t.references :server, references: :servers, foreign_key: true, null: false
      t.timestamps
    end
  end
end
