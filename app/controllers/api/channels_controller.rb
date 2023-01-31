class Api::ChannelsController < ApplicationController

  def index
    server = Server.find_by(id: params[:server_id])
    @channels = server.channels
    render json: render_channels_json, status: :ok
  end

  def show
    @channel = Channel.find(id: params[:id])
    render json: render_channel_json, status: :ok
  end

  def create
    @channel = Channel.new(channel_params)
    if channel.save
      render json: render_channel_json, status: :ok
    else
      render json: channel.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @channel = Channel.find_by(id: params[:id])
    if channel.update(channel_params)
      render json: render_channel_json, status: :ok
    else
      render json: channel.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    if channel && channel.destroy
      render json: render_channel_json, status: :ok
    else
      render json: ["This channel does not exist"], status: :not_found
    end
  end

  private

  attr_reader :channel, :channels

  def render_channel_json
    ChannelsPresenters::ChannelPresenter.new(channel)
  end

  def render_channels_json
    ChannelsPresenters::ChannelsPresenter.new(channels)
  end
end