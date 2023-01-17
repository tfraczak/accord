# frozen_string_literal: true

class MessagesPresenters::MessagePresenter < BasePresenter
  alias message object

  def as_json(*)
    {
      author_id: message.author_id,
      body: message.body,
      id: message.id,
      messageable_id: message.messageable_id,
      messageable_type: message.messageable_type,
      created_at: message.created_at,
      updated_at: message.updated_at,
      author: author,
    }.camelize
  end

  private

  def author
    @author ||= {
      local_username: message.local_username,
      membership_id: message.membership&.id,
    }.merge(UsersPresenters::UserPresenter.new(message.author).as_json)
  end
end