class Api::MembershipsController < ApplicationController

    def create
        membership = Membership.new(membership_params)
        if membership.save
            @server = Server.find_by(id: membership.joinable_id)
            render :create
        else
            render json: membership.errors.full_messages, status: 422
        end
    end

    def update # used only for updating local_username
        @membership = Membership.find_by(id: params[:id])

        if local_username_valid? && @membership.update(local_username_params)
            @user = User.find_by(id: @membership.user_id)
            render :create
        elsif @membership && local_username_empty?
            render json: ["Local username cannot be empty."], status: 422
        elsif illegal_update?
            render json: ["Cannot update other membership parameters."], status: 403
        else
            render json: ["Invalid entry for membership paramters."], status: 422
        end
    end

    def destroy
        @membership = Membership.find_by(id: params[:id])
        if @membership
            @membership.destroy
            render :destroy
        else
            render json: ["User doesn't belong to this server."], status: 422
        end
    end

    private

    def local_username_valid?
        membership_params[:local_username] && !membership_params[:local_username].empty?
    end

    def local_username_empty?
        !membership_params[:local_username] || membership_params[:local_username].empty?
    end

    def illegal_update?
        !membership_params[:user_id] &&
        !membership_params[:joinable_id] &&
        !membership_params[:joinable_type]
    end

end