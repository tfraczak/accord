class Message < ApplicationRecord

    validates :body, :author_id, :messageable_id, :messageable_type, presence: true

    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :messageable,
        polymorphic: true

    def server
        if self.messageable_type == "Channel"
            channel = Channel.find_by(id: self.messageable_id)
            return channel.server if channel
        end
        nil
    end

    def conversation
        Conversation.find_by(id: self.messageable_id)
    end

    def local_username
        membership = self.membership
        if membership
            return membership.local_username unless membership.local_username == ""
            return self.author.username
        end
        return self.author.username if self.author
        nil
    end

    def membership
        case(self.messageable_type)
        when "Channel"
            Membership.find_by(user_id: self.author_id, joinable_id: self.server.id, joinable_type: "Server")
        when "Conversation"
            Membership.find_by(user_id: self.author_id, joinable_id: self.conversation.id, joinable_type: "Conversation")
        end
    end

end