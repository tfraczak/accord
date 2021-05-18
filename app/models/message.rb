class Message < ApplicationRecord

    validates :body, :author_id, :messageable_id, :messageable_type, presence: true

    belongs_to :author

    belongs_to :messageable

end