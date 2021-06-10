class Membership < ApplicationRecord

    validates :user_id, :joinable_type, :joinable_id, presence: true
    validates :user_id, uniqueness: { scope: [:joinable_type, :joinable_id] }

    belongs_to :user, inverse_of: :memberships
    belongs_to :joinable, polymorphic: true, inverse_of: :memberships

    before_validation :assign_local_username

    def assign_local_username
        self.local_username ||= ""
    end

end