# frozen_string_literal: true

class Presenters::BasePresenter::AsJsonNotDefinedError < Accord::BaseError
  def initialize(klass)
    msg = "#as_json is not defined in #{klass.to_s}"
    super({ message: msg })
  end
end