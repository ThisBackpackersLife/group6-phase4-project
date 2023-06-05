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
    _password_hash = db.Column( db.String( 1, 30 ) )
    created_at = db.Column( db.DateTime, server_default=db.func.now() )
    updated_at = db.Column( db.DateTime, onupdate=db.func.now() )

    reviews = db.relationship( 'Review', backref = 'user' )
    restaurants = association_proxy( 'reviews', 'restaurant' )

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
    
    def __repr__( self ):
        return f'<User { self.username }, ID: { self.id }'
    
class Restaurant( db.Model, SerializerMixin ):
    __tablename__ = "restaurants"

    serialize_rules = ( '-user.restaurants', 'reviews' )

    id = db.Column( db.Integer, primary_key=True )
    name = db.Column( db.String( 50 ), unique=True )
    image = db.Column( db.String, unique=True )
    address = db.Column( db.String, unique=True )
    created_at = db.Column( db.DateTime, server_default=db.func.now() )
    updated_at = db.Column( db.DateTime, onupdate=db.func.now() )

    reviews = db.relationship( 'Review', backref = 'restaurant' )
    users = association_proxy( 'reviews', 'user' )

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

    def __repr__( self ):
        return f'<Review ID:{ self. id }, Rating: { self.rating }, user_id:{ self.user_id }, restaurant_id:{ self.restaurant_id }'