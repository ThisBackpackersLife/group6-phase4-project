#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Review, Restaurant


restaurant_address = open("./data/RestaurantsAddress.txt", "r")
image_url = open("./data/ImageUrls.txt", "r")
restaurant_name = open("./data/Restaurants.txt", "r")

CUISINE = ["Italian", "Mexican", "Indian", "Japanese", "Chinese"]
PRICE = ["cheap", "moderate", "expensive"]
DIET = ["vegan","vegetarian","gluten-free"]

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        names = []
        urls = []
        addresses = []
        for name in restaurant_name:
            names.append(name.replace("\n",""))
        for image in image_url:
            urls.append(image.replace("\n",""))
        for address in restaurant_address:
            addresses.append(address.replace("\n",""))

        print("Starting seed...")
        # Seed code goes here!

        print( "Deleting data..." )
        User.query.delete()
        Review.query.delete()
        Restaurant.query.delete()

        print( "Creating users..." )
        users = []
        for i in range(100):
            user = User(
                username = fake.first_name(),
                email = fake.email(),
                avatar = "https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png",
                _password_hash = randint(1000000,9999999),
            )
            users.append(user)

        print( "Creating restaurants..." )
        restaurants = []
        for i in range(50):
            restaurant = Restaurant(
                name = names[i],
                image = urls[i],
                address = addresses[i],
                cuisine = rc(CUISINE),
                price = rc(PRICE),
                diet = rc(DIET)
            )
            restaurants.append(restaurant)

        print( "Creating reviews..." )
        reviews = []
        for i in range(100):
            review = Review(
                body = fake.paragraph( nb_sentences=4 ), 
                rating = randint( 1, 5 ),
                image = urls[randint(0,49)],
                user_id = randint(1,100),
                restaurant_id = randint(1,100)
            )
            reviews.append(review)

        db.session.add_all( users )
        db.session.add_all( restaurants )
        db.session.add_all( reviews )
        db.session.commit()

        print( "Seeding complete!" )