# frozen_string_literal: true

class Presenters::BasePresenter::AsJsonUsingSuperError < Accord::BaseError
  def initialize(klass)
    msg = "#{klass.to_s}#as_json is using super"
    super({ message: msg })
  end
end