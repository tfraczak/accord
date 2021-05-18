class Api::ChannelsController < ApplicationController

    def index
        server = Server.find_by(id: params[:server_id])
        @channels = server.channels
        render :index
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            render :show
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def update
        @channel = Channel.find_by(id: params[:id])
        if @channel.update(channel_params)
            render :show
        else
            render json: @channel.errors.full_messages, status: 422
        end

    end

    def destroy
        @channel = Channel.find_by(id: params[:id])
        if @channel
            @channel.destroy
            render :show
        else
            render json: ["This channel does not exist"], status: 404
        end
    end

end