module ApplicationHelper

    def current_user_assignment
        # convert current_user info into json
        "<script>
            globalThis.currentUser = {
                id: #{current_user.id},
                username: `#{current_user.username}`,
                usernameId: #{current_user.username_id},
                avatarUrl: `#{current_user.avatar_url}`
            };
        </script>".html_safe
    end

end
