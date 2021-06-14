class Membership < ApplicationRecord

    validates :user_id, :joinable_type, :joinable_id, presence: true
    validates :user_id, uniqueness: { scope: [:joinable_type, :joinable_id] }

    belongs_to :user, inverse_of: :memberships
    belongs_to :joinable, polymorphic: true, inverse_of: :memberships

    before_validation :assign_local_username

    def assign_local_username
        self.local_username ||= ""
    end

    def updated_messages
        messages = []
        case self.joinable_type
        when "Server"
            self.joinable.channels.each do |channel|
                messages.push(
                    *Message
                        .where(messageable_type: :Channel, messageable_id: channel.id)
                        .order(created_at: :desc)
                        .limit(50)
                )
            end
        when "Conversation"
            messages = Message
                .where(messageable_type: :Conversation, messageable_id: self.joinable.id)
                .order(created_at: :desc)
                .limit(50)
        end
        messages
    end

end