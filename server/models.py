from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from flask import abort 

from config import db, bcrypt

# Models go here:
class User( db.Model, SerializerMixin ):
    __tablename__ = 'users'

    serialize_rules = ( '-reviews.user' )

    id = db.Column( db.Integer, primary_key=True )
    username = db.Column( db.String )
    email = db.Column( db.String, unique = True )
    _password_hash = db.Column( db.String( 30 ) )
    avatar = db.Column( db.String )
    created_at = db.Column( db.DateTime, server_default=db.func.now() )
    updated_at = db.Column( db.DateTime, onupdate=db.func.now() )

    reviews = db.relationship( 'Review', backref = 'user' )
    restaurants = association_proxy( 'reviews', 'restaurant' )

    def user_info( self ):
        return {
            "username": self.username,
            "email": self.email,
            "id": self.id
        }

    @hybrid_property
    def password_hash( self ):
        raise Exception( "Password hashes may not be viewed." )
    
    @password_hash.setter
    def password_hash( self, password ):
        password_hash = bcrypt.generate_password_hash(
            password.encode( 'utf-8' )
        )
        self._password_hash = password_hash.decode( 'utf-8' )

    def authenticate( self, password ):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode( 'utf-8' )
        )
    
    @validates( 'username' )
    def validate_username( self, key, username ):
        pass

    @validates( 'email' )
    def validate_email( self, key, email ):
        pass

    @validates( '_password_hash' )
    def validate__password_hash( self, key, _password_hash ):
        pass
    
    def __repr__( self ):
        return f'<User { self.username }, ID: { self.id }'
    
class Restaurant( db.Model, SerializerMixin ):
    __tablename__ = "restaurants"

    serialize_rules = ( '-user.restaurants', 'reviews' )

    id = db.Column( db.Integer, primary_key=True )
    name = db.Column( db.String( 50 ), unique=True )
    image = db.Column( db.String )
    address = db.Column( db.String, unique=True )
    created_at = db.Column( db.DateTime, server_default=db.func.now() )
    updated_at = db.Column( db.DateTime, onupdate=db.func.now() )

    reviews = db.relationship( 'Review', backref = 'restaurant' )
    users = association_proxy( 'reviews', 'user' )

    @validates( 'name' )
    def validate_name( self, key, name ):
        pass

    @validates( 'image' )
    def validate_image( self, key, image ):
        pass

    @validates( 'address' )
    def validate_address( self, key, address ):
        pass

    def __repr__( self ):
        return f'<Restaurant ID: { self.id }, name:{ self.name }'

class Review( db.Model, SerializerMixin ):
    __tablename__ = "reviews"

    serialize_rules = ( '-user.reviews' )

    id = db.Column( db.Integer, primary_key=True )
    body = db.Column( db.String( 500 ) )
    rating = db.Column( db.Integer )
    image = db.Column( db.String )
    created_at = db.Column( db.DateTime, server_default=db.func.now() )
    updated_at = db.Column( db.DateTime, onupdate=db.func.now() )

    user_id = db.Column( db.Integer, db.ForeignKey( 'users.id' ) )
    restaurant_id = db.Column( db.String, db.ForeignKey( 'restaurants.id' ))

    @validates( 'body' )
    def validate_body( self, key, body ):
        if isinstance( body, str ) and len( body ) <= 500:
            return body
        else:
            abort( 422, "Body must be a string less than 500 characters." )

    @validates( 'user_id' )
    def validate_user_id( self, key, user_id ):
        if isinstance( user_id, int ) and user_id > 0:
            return user_id
        else:
            abort( 422, "User id must be a number greater than 0." )

    @validates( 'restaurant_id' )
    def validate_restaurant_id( self, key, restaurant_id ):
        if isinstance( restaurant_id, int ) and restaurant_id > 0:
            return restaurant_id
        else:
            abort( 422, "Restaurant id must be a number greater than 0." )

    def __repr__( self ):
        return f'<Review ID:{ self. id }, Rating: { self.rating }, user_id:{ self.user_id }, restaurant_id:{ self.restaurant_id }'
