class Channel < ApplicationRecord

    validates :name, :server_id, :media_type, presence: true

    belongs_to :server

    has_many :messages, 
        as: :messageable,
        dependent: :destroy

    before_save :format_name
    before_update :format_name
    
    def format_name
        self.name = self.name[0...-1] if self.name[-1] == "-"
    end

end