class Api::InvitationsController < ApplicationController

    def index
        @invitations = Invitation.where(server_id: params[:server_id])
        render :index
    end

    def show
        invitation = Invitation.find_by(url_token: params[:url_token])
        
        if invitation
            @server = Server.find_by(id: invitation.server_id)
            render :show
        else
            render json: ["Invitation does not exist."], status: 404
        end
    end

    def create
        @invitation = Invitation.new(invitation_params)
        if @invitation.save
            render :show
        else
            render json: @invitation.errors.full_messages, status: 422
        end

    end

    def destroy
        @invitation = Invitation.find_by(id: params[:id])
        if @invitation
            @invitation.destroy
            render :show
        else
            render json: ["Invitation does not exist."], status: 404
        end
    end

end