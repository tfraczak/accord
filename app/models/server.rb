class Server < ApplicationRecord

    validates :name, :owner_id, presence: true

    before_validation :assign_empty_image
    after_save :assign_owner_as_member

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

end