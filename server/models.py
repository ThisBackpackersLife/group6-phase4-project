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
    avatar = db.Column( db.String, default="https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png" )
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
        user = User.query.filter( User.username.like( f'%{ username }%' ) ).first()
        if isinstance( username, str ) and username and user == None:
            return username
        else:
            abort( 422, "Username must be a unique string." )

    @validates( 'email' )
    def validate_email( self, key, email ):
        user = User.query.filter( User.email.like( f'%{ email }%' ) ).first()
        if isinstance( email, str ) and email and user == None:
            return email
        else:
            abort( 422, "Email must be a unique string." ) 
    
    def __repr__( self ):
        return f'<User { self.username }, ID: { self.id }'
    
class Restaurant( db.Model, SerializerMixin ):
    __tablename__ = "restaurants"

    serialize_rules = ( '-user.restaurants', 'reviews' )

    id = db.Column( db.Integer, primary_key=True )
    name = db.Column( db.String( 50 ), unique=True )
    image = db.Column( db.String )
    address = db.Column( db.String, unique=True )
    cuisine = db.Column(db.String)
    price = db.Column(db.String)
    diet = db.Column(db.String)

    created_at = db.Column( db.DateTime, server_default=db.func.now() )
    updated_at = db.Column( db.DateTime, onupdate=db.func.now() )

    reviews = db.relationship( 'Review', backref = 'restaurant' )
    users = association_proxy( 'reviews', 'user' )

    @validates( 'name' )
    def validate_name( self, key, name ):
        restaurant = Restaurant.query.filter( Restaurant.name.like( f'%{ name }%' ) ).first()
        if isinstance( name, str ) and len( name ) <= 50 and restaurant == None:
            return name
        else:
            abort( 422, "Name must be a unique string less than 50 characters." )

    @validates( 'image' )
    def validate_image( self, key, image ):
        restaurant = Restaurant.query.filter( Restaurant.image.like( f'%{ image }%' ) ).first()
        if isinstance( image, str ) and image and restaurant == None:
            return image
        else:
            abort( 422, "Image already exists with a different restaurant." )

    @validates( 'address' )
    def validate_address( self, key, address ):
        restaurant = Restaurant.query.filter( Restaurant.address.like( f'%{ address }%' ) ).first()
        if isinstance( address, str ) and address and restaurant == None:
            return address
        else: 
            abort( 422, "Address must be a unique string." )

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
