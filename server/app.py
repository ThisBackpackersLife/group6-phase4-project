#!/usr/bin/env python3

# Standard library imports
from flask import make_response, jsonify, request, session

# Local imports
from config import app, db, api, Resource
from models import User, Restaurant, Review

# Views go here!

@app.route('/')
def home():
    return '<h1>Welcome to the Culinary Critic</h1>'

# @app.route( '/clear', methods=[ "DELETE" ] )
# def clear_session():
#     if request.method == "DELETE":
#         db.session.delete()

class ClearSession( Resource ):
    
    def delete( self ):

        session[ 'page_views' ] = None
        session[ 'user_id' ] = None

        return {}, 204
    
class Signup( Resource ):
    
    def post( self ):

        try:
            username = request.get_json()[ 'username' ]
            email = request.get_json()[ 'email' ]
            password = request.get_json()[ 'password' ]
        except KeyError:
            return { "error": "Missing 'username' or 'password'." }, 400
        
        if username and password:
            new_user = User(
                username = username,
                email = email, 
            )
            new_user.password_hash = password
            db.session.add( new_user )
            db.session.commit()

            session[ 'user_id' ] = new_user.id
        
            return new_user.user_info(), 201
        else:
            return { "error": "Unprocessable Entity" }, 422
        
class CheckSession( Resource ):

    def get( self ):
        if session.get( 'user_id' ):
            user = User.query.filter( User.id == session[ 'user_id' ]).first()
            return user.user_info(), 200
        else:
            return {}, 204
        
class Login( Resource ):

    def post( self ):
        try:
            username = request.get_json()[ 'username' ]
            password = request.get_json()[ 'password' ]
        except TypeError:
            return { "error": "Missing 'username' or 'password'." }, 400
        
        user = User.query.filter( User.username == username ).first()

        if user.authenticate( password ):
            session[ 'user_id' ] = user.id
            return user.user_info(), 200
        else:
            return { "error": "Members Only Content, Unauthorized Access!"}, 401
        
class Logout( Resource ):

    def delete( self ):

        session[ 'user_id' ] = None

        return {}, 204

api.add_resource( ClearSession, '/clear', endpoint = 'clear' )
api.add_resource( Signup, '/signup', endpoint = 'signup' )
api.add_resource( CheckSession, '/check_session', endpoint='check_session' )
api.add_resource( Login, '/login', endpoint='login' )
api.add_resource( Logout, '/logout', endpoint='logout' )

@app.route( '/users', methods=[ "GET" ] )
def users():
    if request.method == "GET":
        users = [ user_to_dict( user ) for user in User.query.all() ]
        return make_response( jsonify( users ), 200 )

@app.route( '/user/<int:id>', methods=[ "GET", "DELETE" ] )
def user( id ):
    user = User.query.filter( User.id == id ).first()
    if user:
        if request.method == "GET":
            user_dict =  user_to_dict( user)
            user_dict["reviews"] = [review_to_dict(r) for r in user.reviews]
            return make_response( jsonify( user_dict ), 200 )
        
        elif request.method == "DELETE":
            Review.query.filter_by( user_id = id ).delete()
            db.session.delete( user )
            db.session.commit()

            return make_response( '', 404 )
    
    else:
        return make_response( "User not found.", 404 )

@app.route( '/restaurants', methods=[ "GET", "POST" ] )
def restaurants():
    if request.method == "GET":
        restaurants = [ restaurant_to_dict( restaurant ) for restaurant in Restaurant.query.all() ]
        return make_response( jsonify( restaurants ), 200 )
    
    elif request.method == "POST":
        new_restaurant = Restaurant(
            name = request.get_json()[ 'name' ],
            address = request.get_json()[ 'address' ],
            image = request.get_json()[ 'image' ]
        )
        db.session.add( new_restaurant )
        db.session.commit()

        return make_response( jsonify( restaurant_to_dict( new_restaurant )), 201 )
    
@app.route( '/restaurant/<int:id>', methods=[ "GET", "PATCH", "DELETE" ] )
def restaurant( id ):
    restaurant = Restaurant.query.filter( Restaurant.id == id ).first()

    if restaurant:
        if request.method == "GET":
            return make_response( jsonify( restaurant_to_dict( restaurant )), 200 )
        
        elif request.method == "PATCH":
            data = request.get_json()
            if data:
                for attr, value in data.items():
                    setattr( restaurant, attr, value )
                db.session.commit()
                return make_response( jsonify( restaurant_to_dict( restaurant )), 200 )
            else:
                return make_response( "No data provided for updating restaurant.", 400 )
        
        elif request.method == "DELETE":
            db.session.delete( restaurant )
            db.session.commit()

            return make_response( '', 404 )
    else:
        return make_response( "Restaurant not found.", 404 )

@app.route( '/reviews', methods=[ "GET", "POST" ] )
def reviews():
    if request.method == "GET":
        reviews = [ review_to_dict( review ) for review in Review.query.all() ]
        return make_response( jsonify( reviews ), 200 )
    
    elif request.method == "POST":
        new_review = Review(
            body = request.get_json()[ 'body' ],
            rating = request.get_json()[ 'rating' ],
            image = request.get_json()[ 'image' ],
            user_id = request.get_json()[ 'user_id' ],
            restaurant_id = request.get_json()[ 'restaurant_id' ]
        )
        db.session.add( new_review )
        db.session.commit()

        return make_response( jsonify( review_to_dict( new_review )), 201 )

@app.route( '/review/<int:id>', methods=[ "GET", "PATCH", "DELETE" ] )
def review( id ):
    review = Review.query.filter( Review.id == id ).first()

    if review:
        if request.method == "GET":
            return make_response( jsonify( review_to_dict( review )), 200 )
        
        elif request.method == "PATCH":
            data = request.get_json()
            if data:
                for attr, value in data.items():
                    setattr( review, attr, value )
                db.session.commit()
                return make_response( jsonify( review_to_dict( review )), 200 )
            else:
                return make_response( "No data provided for updating review.", 400 )
            
        elif request.method == "DELETE":
            db.session.delete( review )
            db.session.commit()
            return make_response( '', 404 )
    else:
        return make_response( "Review not found.", 404 )

def user_to_dict( user ):
    return {
        "id": user.id,
        "username": user.username,
        "_password_hash": user._password_hash,
        "email": user.email
    }

def restaurant_to_dict( restaurant ):
    return {
        "id": restaurant.id,
        "name": restaurant.name,
        "image": restaurant.image,
        "address": restaurant.address
    }

def review_to_dict( review ):
    return {
        "id": review.id,
        "body": review.body,
        "rating": review.rating,
        "image": review.image,
        "user_id": review.user_id,
        "restaurant_id": review.restaurant_id
    }

if __name__ == '__main__':
    app.run(port=5555, debug=True)