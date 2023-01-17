# frozen_string_literal: true

class ChannelsPresenters::ChannelPresenter < BasePresenter
  alias channel object

  def as_json(*)
    {
      id: channel.id,
      name: channel.name,
      media_type: channel.media_type,
      server_id: channel.server_id,
      default: !!channel.default,
    }.camelize
  end
end