class Server < ApplicationRecord

    validates :name, :owner_id, presence: true

    before_validation :assign_empty_image
    after_create :assign_owner_as_member, :create_general_channel

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User
    
    has_many :memberships,
        as: :joinable,
        inverse_of: :joinable,
        dependent: :destroy

    has_many :members,
        through: :memberships,
        source: :user

    has_many :invitations,
        dependent: :destroy

    has_many :channels,
        dependent: :destroy

    has_many :messages,
        through: :channels,
        source: :messages

    def assign_empty_image
        self.image_url ||= ""
    end

    def assign_owner_as_member
        Membership.new(
            user_id: self.owner_id,
            joinable_type: self.class.to_s,
            joinable_id: self.id
        ).save
    end

    def create_general_channel
        Channel.new(
            name: "general",
            server_id: self.id,
            media_type: "Text"
        ).save
    end

end