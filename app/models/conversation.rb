class Conversation < ApplicationRecord

  validates :initiator_id, :receiver_id, presence: true

  belongs_to :initiator,
    foreign_key: :initiator_id,
    class_name: :User

  has_many :messages, 
    as: :messageable
  
  has_many :memberships,
    as: :joinable

  has_many :members,
    through: :memberships,
    source: :user

  before_validation :assign_name
  after_create :create_initial_membership

  has_one_attached :image

  def assign_name
    self.name ||= ""
  end

  def self.find_by_user_ids(user_ids)
    user_ids.sort!
    memberships = Membership.where(user_id: user_ids[0], joinable_type: :Conversation)
    return nil if memberships.empty?
    conversations_hash = Hash[memberships.map { |mem| [mem.joinable, mem.joinable.members.pluck(:id).sort!] }]
    conversations_hash.each { |convo, member_ids| return convo if member_ids == user_ids }
    nil
  end

  def self.find_by_initiation_ids(i, r)
    conversations = Conversation.where(initiator_id: i, receiver_id: r)
    return nil if conversations.length == 0
    conversations.each { |conversation| return conversation if conversation.members.length == 1 }
    nil
  end

  def create_initial_membership
    Membership.new(
      user_id: self.initiator_id,
      local_username: "",
      joinable_type: :Conversation,
      joinable_id: self.id
    ).save
  end

  def create_memberships(user_ids)
    user_ids.map do |id|
      mem = Membership.new(
        user_id: id,
        local_username: "",
        joinable_type: self.class.to_s,
        joinable_id: self.id
      )
      mem if mem.save
    end
  end
      
end