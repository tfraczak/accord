# frozen_string_literal: true

class ChannelsPresenters::ChannelsPresenter < BasePresenter
  alias channels object

  def as_json(*)
    {
      channels: records_json(channels),
      messages: records_json(messages),
    }.camelize
  end

  private

  attr_reader :messages

  def messages
    @messages ||= channels.with_messages.flat_map(&:messages)
  end
end