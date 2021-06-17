class Api::ConversationsController < ApplicationController
  
  def index
    user = User.find_by(id: params[:user_id])
    if user
      @conversations = user.conversations
      render :index
    end
  end

  def create
    @found = false
    user_ids = [current_user.id, params[:user_id].to_i]
    @convo = Conversation.find_by_user_ids(user_ids)
    if !@convo
      @convo = Conversation.new(
        initiator_id: current_user.id,
        name: "",
        receiver_id: params[:user_id].to_i
      )

      if @convo.save
        render :create
      else
        render json: @convo.errors.full_messages, status: 409        
      end

    else
      @convo = Conversation.find_by_initiation_ids(current_user.id, params[:user_id].to_i)
      if @convo
        render :create
      else
        @found = true
        render :show
      end
    end
  end

end