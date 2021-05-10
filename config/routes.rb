Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update, :destroy] do
      resources :servers, only: :index
    end
    resource :session, only: [:create, :destroy]
    resources :servers, only: [:create, :update, :destroy] do
      resources :users, only: :index
      resources :channels, only: :index
      resources :roles, only: :index
    end
    resources :channels, only: [:create, :update, :destroy] do
      resources :messages, only: :index
    end
    resources :conversations, only: [:create, :update, :destroy] do
      resources :users, only: :index
      resources :messages, only: :index
    end
    resources :memberships, only: [:create, :update, :destroy]
    resources :messages, only: [:create, :update, :destroy]
    resources :roles, only: [:create, :destroy]
  end

end
