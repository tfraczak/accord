# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_14_012433) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "invitations", force: :cascade do |t|
    t.string "url_path"
    t.bigint "server_id", null: false
    t.integer "expiration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_invitations_on_server_id"
    t.index ["url_path"], name: "index_invitations_on_url_path", unique: true
  end

  create_table "memberships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "local_username"
    t.string "joinable_type", null: false
    t.bigint "joinable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["joinable_type", "joinable_id"], name: "index_memberships_on_joinable_type_and_joinable_id"
    t.index ["user_id", "joinable_id", "joinable_type"], name: "unique_membership_index", unique: true
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "servers", force: :cascade do |t|
    t.string "name", null: false
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "owner_id"
    t.index ["owner_id"], name: "index_servers_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.integer "username_id", null: false
    t.string "avatar_url"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username", "username_id"], name: "unique_username_by_uid", unique: true
  end

  add_foreign_key "invitations", "servers"
  add_foreign_key "memberships", "users"
  add_foreign_key "servers", "users", column: "owner_id"
end
