# frozen_string_literal: true

class BasePresenter::DirectUseError < Accord::BaseError
  def message
    'The abstract class presenter is being used directly'
  end
end