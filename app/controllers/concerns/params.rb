module Params

  private

  def user_params
    params.require(:user).permit(:email, :password, :username)
  end

  def server_params
    params.require(:server).permit(:name, :image_url, :owner_id, :image)
  end

  def channel_params
    params.require(:channel).permit(:name, :media_type, :server_id, :default)
  end

  def conversation_params
    params.require(:conversation).permit(:name, :initiator_id, :image, :user_ids)
  end

  def membership_params
    params.require(:membership).permit(:user_id, :joinable_id, :joinable_type, :local_username)
  end

  def message_params
    params.require(:messages).permit(:body, :author_id, :messageable_id, :messageable_type)
  end

  # def role_params
  #   params.require(:role).permit(:user_id, :ord, :roleable_id, :roleable_type)
  # end

  # def user_relationship_params
  #   params.require(:user_relationship).permit(:initiator_id, :receiver_id, :relation, :status)
  # end

  # def mention_params
  #   params.require(:mention).permit(:mentioner_id, :mentionee_id, :message_id)
  # end

  def invitation_params
    params.require(:invitation).permit(:expiration, :inviter_id, :server_id)
  end

end