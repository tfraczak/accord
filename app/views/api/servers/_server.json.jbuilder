json.extract! server, :id, :name, :owner_id, :image_url
if server.image_url == "" 
  json.imageUrl server.image.attached? ? url_for(server.image) : ""
end