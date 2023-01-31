class User < ApplicationRecord
  devise :database_authenticatable, :registerable, #:trackable,
          :recoverable, :validatable, #:rememberable,
          :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :email,
    :username,
    :username_id,
    presence: true
  validates :email, uniqueness: true
  validates :username, uniqueness: { scope: :username_id }
  validates :password,
    presence: true,
    confirmation: true,
    on: :create
  validates :password,
    allow_nil: true,
    confirmation: false,
    on: :update
  validate :password_format, if: :password?

  before_validation :assign_username_id, :assign_default_avatar

  has_many :owned_servers,
    foreign_key: :owner_id,
    class_name: :Server

  has_many :memberships,
    inverse_of: :user,
    dependent: :destroy

  has_many :joined_servers,
    through: :memberships,
    source: :joinable,
    source_type: :Server

  has_many :messages,
    foreign_key: :author_id,
    class_name: :Message

  has_many :invitations,
    foreign_key: :inviter_id

  has_one_attached :avatar

  has_many :conversations,
    through: :memberships,
    source: :joinable,
    source_type: :Conversation

  has_many :initiated_conversations,
    foreign_key: :initiator_id,
    class_name: :Conversation

  def self.generate_username_id(username)
    users = User.where(username: username)
    if users.length == 0
      rand_user_id = (10000*rand()).floor.to_s
      return rand_user_id if rand_user_id.length == 4
      case rand_user_id.length
      when 3
        return "0" + rand_user_id
      when 2
        return "00" + rand_user_id
      when 1
        return "000" + rand_user_id
      end

    elsif users.length >= 10000
      raise "Too many users have this username, please try another"
    else
      taken = true
      while taken
        rand_user_id = ((10000*rand())).floor.to_s
        taken = User.find_by(username_id: rand_user_id)
      end
      return rand_user_id if rand_user_id.length == 4
      case rand_user_id.length
      when 3
        return "0" + rand_user_id
      when 2
        return "00" + rand_user_id
      when 1
        return "000" + rand_user_id
      end
    end
  end

  def assign_username_id
    self.username_id ||= User.generate_username_id(self.username)
  end

  def assign_default_avatar
    self.avatar_url ||= ""
  end

  def local_username(server_id)
    membership = Membership.find_by(
      joinable_id: server_id,
      joinable_type: "Server",
      user_id: self.id,
    )
    return membership.local_username if membership && (membership.local_username != "")
    return self.username
  end

  private

  attr_reader :password

  def password?
    !!password
  end

  VALID_PASSWORD_LENGTH = /\A(?=.{8,})/x
  VALID_PASSWORD_LOWERCASE = /\A(?=.*[a-z])/x
  VALID_PASSWORD_UPPERCASE = /\A(?=.*[A-Z])/x
  VALID_PASSWORD_DIGIT = /\A(?=.*\d)/x
  VALID_PASSWORD_SYMBOL = /\A(?=.*[[:^alnum:]])/x
  INVALID_PASSWORD_CHARS = /\A(?=.*[^[:ascii:]])/x
  INVALID_PASSWORD_SPACE = /\A(?=.*\s)/x

  def password_format
    if password.match(INVALID_PASSWORD_CHARS) || password.match(INVALID_PASSWORD_SPACE)
      errors.add(:password, 'contains invalid characters')
    else
      length = ''
      err = []
      length = 'be at least 8 characters' unless password.match(VALID_PASSWORD_LENGTH)
      err << 'a lower case letter' unless password.match(VALID_PASSWORD_LOWERCASE)
      err << 'a capital letter' unless password.match(VALID_PASSWORD_UPPERCASE)
      err << 'a number' unless password.match(VALID_PASSWORD_DIGIT)
      err << 'a symbol' unless password.match(VALID_PASSWORD_SYMBOL)
      err[-1] = 'and ' + err[-1] if err.present? && err.length > 1
      error_message = formatted_password_error_message(length, err)
      if error_message
        errors.add(:password, formatted_password_error_message(length, err))
      end
    end
  end

  def formatted_password_error_message(length_error, error_array)
    return nil if length_error.empty? && error_array.empty?
    length_message = ''
    additional_errors_message = ''
    if length_error.present?
      prefix_1 = error_array.present? ? ', ' : ''
      prefix_2 = error_array.length > 1 ? '' : 'and '
      additional_errors_prefix = prefix_1 + prefix_2
      length_message = length_error.present? ? length_error + additional_errors_prefix : ''
    end

    if error_array.present?
      additional_errors_message = 'contain ' + error_array.join(', ')
    end

    'must ' + length_message + additional_errors_message
  end
end