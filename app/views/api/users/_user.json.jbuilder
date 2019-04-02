
listedProducts = user.listed_products.map { |product| product.id }

json.set! user.id do
    json.extract! user, 
    :id, :email, :shop_name, 
    :image_url, :gender, :location,
    :birthday, :about, :favorite_material
    json.listedProducts do 
        json.array! listedProducts
    end
end
