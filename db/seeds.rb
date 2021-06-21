# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
    email: "teddy@gmail.com",
    username: "teddy",
    password: "password",
)

User.create!(
    email: "tim@gmail.com",
    username: "oilslick",
    password: "password",
)

User.create!(
    email: "alex@gmail.com",
    username: "fraczles",
    password: "password",
)


Server.create!(
    name: "Teddy's Hangout",
    owner_id: 1,
).image.attach(
    io: 
        File.open("#{Rails.root}/app/assets/images/server_image_seeds/little_pea.jpg"),
        filename: "little_pea.jpg",
        content_type: "image/jpg"
)

Server.create!(
    name: "The Apiary",
    owner_id: 2,
).image.attach(
    io: 
        File.open("#{Rails.root}/app/assets/images/server_image_seeds/bee.png"),
        filename: "bee.png",
        content_type: "image/png"
)

Server.create!(
    name: "My Awesome Hangout",
    owner_id: 3,
).image.attach(
    io: 
        File.open("#{Rails.root}/app/assets/images/server_image_seeds/bridge.jpg"),
        filename: "bridge.jpg",
        content_type: "image/jpg"
)

Server.create!(
    name: "Pokemon Fanatics",
    owner_id: 2,
).image.attach(
    io: 
        File.open("#{Rails.root}/app/assets/images/server_image_seeds/gengar.png"),
        filename: "genger.png",
        content_type: "image/png"
)

Membership.create!(
    user_id: 2,
    joinable_type: :Server,
    joinable_id: 1,
)
Membership.create!(
    user_id: 3,
    joinable_type: :Server,
    joinable_id: 2,
)
Membership.create!(
    user_id: 2,
    joinable_type: :Server,
    joinable_id: 3,
)

Invitation.create!(
    server_id: 1,
    inviter_id: 1
)
Invitation.create!(
    server_id: 1,
    expiration: 0,
    inviter_id: 2
)
Invitation.create!(
    server_id: 2,
    inviter_id: 3
)
Invitation.create!(
    server_id: 3,
    inviter_id: 3
)

Channel.create!(
    server_id: 1,
    name: "baby-things",
    media_type: "Text"
)
Channel.create!(
    server_id: 1,
    name: "gourmet-milks",
    media_type: "Text"
)
Channel.create!(
    server_id: 1,
    name: "best-naps",
    media_type: "Text"
)
Channel.create!(
    server_id: 1,
    name: "just-okay-naps",
    media_type: "Text"
)
Channel.create!(
    server_id: 2,
    name: "Development",
    media_type: "Text"
)
Channel.create!(
    server_id: 2,
    name: "Videogames",
    media_type: "Text"
)
Channel.create!(
    server_id: 2,
    name: "Bread",
    media_type: "Text"
)
Channel.create!(
    server_id: 2,
    name: "Watermelons",
    media_type: "Text"
)
Channel.create!(
    server_id: 3,
    name: "this-is-so-awesome",
    media_type: "Text"
)
Channel.create!(
    server_id: 3,
    name: "memes",
    media_type: "Text"
)
