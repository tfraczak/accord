module Params

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  # def server_params
  #   params.require(:server).permit(:name, :image_url, :owner_id)
  # end

  # def channel_params
  #   params.require(:channel).permit(:name, :type, :server_id)
  # end

  # def conversation_params
  #   params.require(:conversation).permit(:initiator_id)
  # end

  # def membership_params
  #   params.require(:membership).permit(:user_id, :local_username, :joinable_id, :joinable_type)
  # end

  # def messages_params
  #   params.require(:messages).permit(:body, :author_id, :messageable_id, :messageable_type)
  # end

  # def role_params
  #   params.require(:role).permit(:user_id, :ord, :roleable_id, :roleable_type)
  # end

  # def user_relationship_params
  #   params.require(:user_relationship).permit(:initiator_id, :receiver_id, :relation, :status)
  # end

  # def mention_params
  #   params.require(:mention).permit(:mentioner_id, :mentionee_id, :message_id)
  # end

end