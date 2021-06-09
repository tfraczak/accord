json.extract! server, :id, :name, :owner_id
json.imageUrl server.image.attached? ? url_for(server.image) : ""