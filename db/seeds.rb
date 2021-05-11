# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.new(
    email: "teddy@gmail.com",
    username: "teddy",
    password: "password",
).create!

User.new(
    email: "tim@gmail.com",
    username: "oilslick",
    password: "password",
).create!

User.new(
    email: "alex@gmail.com",
    username: "fraczles",
    password: "password",
).create!