class Invitation < ApplicationRecord

    validates :server_id, presence: true
    validates :url_path, uniqueness: true

    before_validation :assign_url_path

    belongs_to :server

    def self.generate_url_token
        SecureRandom.urlsafe_base64(7)
    end

    def self.valid_url_token
        token = generate_url_token
        token = generate_url_token while self.find_by(url_path: token)
        token
    end

    def assign_url_path
        self.url_path = Invitation.valid_url_token
    end

end