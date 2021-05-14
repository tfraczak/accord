class Api::InvitationsController < ApplicationController

    def index
        server = Server.find_by(id: params[:server_id])
        @invitations = Invitation.where(server_id: server.id)
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
        @invitation = Invitation.new(server_id: params[:server_id])
        @invitation.expiration = invitation_params[:expiration]
        
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