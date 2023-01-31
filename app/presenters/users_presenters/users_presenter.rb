# frozen_string_literal: true

class UsersPresenters::UsersPresenter < BasePresenter
  alias users object

  def as_json(*)
    { users: records_json(users) }.camelize
  end
end