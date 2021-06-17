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

    i = current_user.id
    r = params[:user_id].to_i
    user_ids = [i,r]

    @convo = Conversation.find_by_user_ids(i,r,user_ids)
    @convo = Conversation.initiated?(i, r) unless @convo

    if !@convo

      @convo = Conversation.new(
        initiator_id: i,
        name: "",
        receiver_id: r
      )

      if @convo.save

        render :create

      else

        render json: @convo.errors.full_messages, status: 409  
        
      end

    else

      @found = true
      render :show

    end

  end

end