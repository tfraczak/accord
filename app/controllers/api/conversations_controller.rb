class Api::ConversationsController < ApplicationController
  
  def index
    user = User.find_by(id: params[:user_id])
    if user
      @conversations = user.conversations
      render :index
    end
  end

  def show
    @convo = Conversation.find_by(id: params[:id])
    if @convo.member?(current_user)
      render :show
    else
      render json: ["You do not belong here..."], status: 403
    end
  end

  def create
    @found = false

    i = current_user.id
    r = params[:user_id].to_i
    user_ids = params[:user_ids] || [i,r]

    @convo = Conversation.find_by_user_ids(i,r,user_ids)
    unless @convo
      @convo = Conversation.initiated?(i, r)
      if @convo
        membership = Membership.find_by(user_id: current_user.id, joinable_id: @convo.id, joinable_type: :Conversation)
        if !membership
          Membership.create(
            user_id: current_user.id,
            joinable_id: @convo.id,
            joinable_type: :Conversation
          )
        end
      end
    end

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