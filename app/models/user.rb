class User < ApplicationRecord

    validates :email,
    :password_digest,
    :session_token,
    :username,
    :username_id,
    presence: true

    validates :email, :session_token, uniqueness: true
    validates :username, uniqueness: { scope: :username_id }

    validates :password, length: { minimum: 8, allow_nil: true }
    
    after_initialize :ensure_session_token
    before_validation :assign_username_id

    def self.find_by_credentials(email, pw)
        user = User.find_by(email: email)
        return user if user && user.is_password?(pw)
        nil
    end

    def self.generate_session_token
        SecureRandom.urlsafe_base64
    end

    def self.generate_username_id(username)
        users = self.where(username: username)
        if users.length == 0
            return 1000
            
        elsif users.length >= 9000
            raise "Too many users have this username, please try another"
        else
            return users.last.username_id + 1
        end
    end

    def password=(pw)
        @password = pw
        self.password_digest = BCrypt::Password.create(pw)
    end

    def is_password?(pw)
        BCrypt::Password.new(self.password_digest).is_password?(pw)
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save
        self.session_token
    end

    def assign_username_id
        self.username_id ||= User.generate_username_id(self.username)
    end

    private

    attr_reader :password

end