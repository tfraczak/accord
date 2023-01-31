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

  private

  def records_json(records)
    records.each_with_object({}) do |record, json|
      klass = record.class.to_s
      presenter = "#{klass.pluralize}Presenters::#{klass}Presenter".constantize
      json[record.id.to_s] = presenter.new(record).as_json
    end
  end
end