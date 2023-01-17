# frozen_string_literal: true

class ChannelsPresenters::ChannelsPresenter < BasePresenter
  alias channels object

  def as_json(*)
    { channels: records_json(channels), messages: records_json(messages) }.camelize
  end

  private

  attr_reader :messages

  def records_json(records)
    records.each_with_object({}) do |record, json|
      klass = record.class.to_s
      presenter = "#{klass.pluralize}Presenters::#{klass}Presenter".constantize
      json[record.id.to_s] = presenter.new(record).as_json
    end
  end

  def messages
    @messages ||= channels.with_messages.flat_map(&:messages)
  end
end