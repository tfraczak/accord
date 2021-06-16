class Api::ConversationsController < ApplicationController
  
  def index
    user = User.find_by(id: params[:user_id])
    if user
      @conversations = user.conversations
      render :index
    end
  end

end