#!/usr/bin/env python3

# Standard library imports
from flask import make_response, jsonify, request, session

# Local imports
from config import app, db, api, Resource
from models import db, User, Restaurant, Review

# Views go here!

@app.route('/')
def home():
    return '<h1>Welcome to the Culinary Critic</h1>'

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
        
            return new_user.to_dict(), 201
        else:
            return { "error": "Unprocessable Entity" }, 422
        
class CheckSession( Resource ):

    def get( self ):
        if session.get( 'user_id' ):
            user = User.query.filter( User.id == session[ 'user_id' ]).first()
            return user.to_dict(), 200
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
            return user.to_dict(), 200
        else:
            return { "error": "Members Only Content, Unauthorized Access!"}, 401
        
class Logout( Resource ):

    def delete( self ):

        session[ 'user_id' ] = None

        return {}, 204
    
class Users( Resource ):

    def get( self ):

        response = [ user.to_dict() for user in User.query.all() ]

        return make_response( jsonify( response, 200, ))
    
class UserByID( Resource ):

    def get( self, id ):
        
        response = User.query.filter( User.id == id).first().to_dict()

        return make_response( jsonify( response, 200, ) )

class Restaurants( Resource ):

    def get( self ):

        response = [ r.to_dict() for r in Restaurant.query.all() ]

        return make_response( jsonify( response, 200,))
    
    def post( self ):

        new_restaurant = Restaurant(
            name = request.form[ 'name' ],
            image = request.form[ 'image' ],
            address = request.form[ 'address' ],
        )
        db.session.add( new_restaurant )
        db.session.commit()

        response = new_restaurant.to_dict()

        return make_response( jsonify( response, 201 ) )
    
api.add_resource( ClearSession, '/clear', endpoint = 'clear' )
api.add_resource( Signup, '/signup', endpoint = 'signup' )
api.add_resource( CheckSession, '/check_session', endpoint='check_session' )
api.add_resource( Login, '/login', endpoint='login' )
api.add_resource( Logout, '/logout', endpoint='logout' )
api.add_resource( Users, '/users', endpoint='users' )
api.add_resource( UserByID, '/users_by_id/<int:id>' )
api.add_resource( Restaurants, '/restaurants', endpoint='restaurants' )





if __name__ == '__main__':
    app.run(port=5555, debug=True)