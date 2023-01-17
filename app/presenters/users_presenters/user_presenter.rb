# frozen_string_literal: true

class UsersPresenters::UserPresenter < BasePresenter
  alias user object

  def as_json(*)
    {
      id: user.id,
      username: user.username,
      username_id: user.username_id,
      avatar_url: user.avatar_url,
    }.camelize
  end
end