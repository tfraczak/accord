class Conversation < ApplicationRecord

  validates :initiator_id, :receiver_id, presence: true

  belongs_to :initiator,
    foreign_key: :initiator_id,
    class_name: :User

  has_many :messages, 
    as: :messageable,
    dependent: :destroy
  
  has_many :memberships,
    as: :joinable,
    inverse_of: :joinable,
    dependent: :destroy

  has_many :members,
    through: :memberships,
    source: :user

  before_validation :assign_name
  after_create :create_initial_membership

  has_one_attached :image

  def assign_name
    self.name ||= ""
  end

  def self.find_by_user_ids(i,r,user_ids)
    conversations = [*Conversation.where(initiator_id: i, receiver_id: r)]
    memberships = [*Membership.where(user_id: i, joinable_type: :Conversation)]
    return nil if memberships.empty?
    mems_hash = Hash[memberships.map { |mem| [mem.joinable, mem.joinable.members.pluck(:id)] }]
    mems_hash.each do |c, ids|
      forward = ids - user_ids
      backward = user_ids - ids
      match = forward.empty? && backward.empty?
      return c if conversations.any? { |convo| convo == c } && match
    end
    nil
  end

  def self.initiated?(i, r)
    conversations1 = [*Conversation.where(initiator_id: i, receiver_id: r)]
    conversations2 = [*Conversation.where(initiator_id: r, receiver_id: i)]
    conversations = conversations1.concat(conversations2)
    return nil if conversations.length == 0
    conversations.each do |conversation|
      return conversation if conversation.members.length == 1
    end
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