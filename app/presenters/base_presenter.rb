# frozen_string_literal: true

class BasePresenter
  attr_reader :object

  def initialize(object)
    @object = object
  end

  def as_json(*)
    raise Presenters::BasePresenter::DirectUseError if is_a?(BasePresenter)
    raise Presenters::BasePresenter::AsJsonUsingSuperError, self.class if self.class.method_defined?(:as_json)
    raise Presenters::BasePresenter::AsJsonNotDefinedError, self.class
  end
end