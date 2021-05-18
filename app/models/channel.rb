class Channel < ApplicationRecord

    validates :name, :server_id, :media_type, presence: true

    belongs_to :server

end