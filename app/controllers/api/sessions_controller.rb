class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(user_params[:email], user_params[:password])
        if @user
            login!(@user)
            render 'api/users/show'
        else
            render json: ["Login or password is invalid."], status: 422
        end
    end

    def destroy
        if logged_in?
            logout!
            render json: {}
        else
            render json: ["No user currently signed in."], status: 404
        end
    end

end