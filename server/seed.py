#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Review, Restaurant

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print( "Deleting data..." )
        User.query.delete()
        Review.query.delete()
        Restaurant.query.delete()

        print( "Creating users..." )
        u1 = User( username = "Nicholas Martin", email = "oweij@gmail.com", _password_hash = "1234567" )
        u2 = User( username = "Warren Zhang", email = "oiweawoe@protonmail.com", _password_hash = "1234567" )
        u3 = User( username = "Yasmeen Yousef", email = "asdfwerf@hotmail.com", _password_hash = "1234567" )
        u4 = User( username = fake.name(), email = "cawcdf@aol.com", _password_hash = "1234567" )
        u5 = User( username = fake.name(), email = "htrhrsa@yahoo.com", _password_hash = "1234asdf" )
        users = [ u1, u2, u3, u4, u5 ]


        print( "Creating restaurants..." )
        res1 = Restaurant( name = "Pappy's STL BBQ", image = "iyuwe.jpg", address = fake.sentence() )
        res2 = Restaurant( name = "Hopdoddy Burger Bar", image = "owqeiur.jpg", address = fake.sentence() )
        res3 = Restaurant( name = "Adrianna's", image = "awetrwe.jpg", address = fake.sentence() )
        res4 = Restaurant( name = "Oyster House", image = "iowue.jpg", address = fake.sentence() )
        res5 = Restaurant( name = "Sugarfire", image = "awearf.jpg", address = fake.sentence() ) 
        restaurants = [ res1, res2, res3, res4, res5 ]

        print( "Creating reviews..." )
        r1 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "kjlkiidj.jpg", user_id = 1, restaurant_id = 1 )
        r2 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "dkjoizse.jpg", user_id = 2, restaurant_id = 2 )
        r3 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "kjpaise.jpg", user_id = 3, restaurant_id = 3 )
        r4 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "duiooaiweuf.jpg", user_id = 4, restaurant_id = 4 )
        r5 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "ioaweawek.jpg", user_id = 5, restaurant_id = 5 )
        r6 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "ioaweawek.jpg", user_id = 2, restaurant_id = 4 )
        r7 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "ioaweawek.jpg", user_id = 4, restaurant_id = 5 )
        r8 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "ioaweawek.jpg", user_id = 3, restaurant_id = 1 )
        r9 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "ioaweawek.jpg", user_id = 1, restaurant_id = 3 )
        r10 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "ioaweawek.jpg", user_id = 1, restaurant_id = 2 )
        r11 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "ioaweawek.jpg", user_id = 3, restaurant_id = 3 )
        r12 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "ioaweawek.jpg", user_id = 4, restaurant_id = 4 )
        r13 = Review( body = fake.paragraph( nb_sentences=4 ), rating = randint( 1, 5 ), image = "ioaweawek.jpg", user_id = 2, restaurant_id = 1 )

        reviews = [ r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13 ]

        db.session.add_all( users )
        db.session.add_all( reviews )
        db.session.add_all( restaurants )
        db.session.commit()

        print( "Seeding complete!" )