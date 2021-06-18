Rails.application.routes.draw do
  root to: "static_pages#root"
  mount ActionCable.server, at: '/cable'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update, :destroy] do
      resources :servers, only: :index
      resources :conversations, only: [:index, :create]
    end
    resource :session, only: [:create, :destroy]
    resources :servers, only: [:create, :update, :destroy, :show] do
      resources :users, only: :index
      resources :channels, only: :index
      resources :roles, only: :index
      resources :invitations, only: :index
      resources :memberships, only: [:index, :create]
    end
    resources :channels, only: [:create, :update, :destroy, :show] do
      resources :messages, only: :index
    end
    resources :conversations, only: [:update, :show] do
      resources :users, only: :index
      resources :messages, only: :index
      resources :memberships, only: [:index, :create]
    end
    resources :memberships, only: [:update, :destroy]
    resources :messages, only: [:create, :update, :destroy]
    resources :roles, only: [:create, :destroy]
    get '/invitations/:url_token', to: 'invitations#show', as: :invitation
    resources :invitations, only: [:destroy, :create]
  end

end
