from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from .database import Base


# this is basically where you handle all of the entrypoints to 
# each table in the database. 
# from my research, you shouldn't make a single entrypoint to the entire thing.
# for security, you hardcode all of the tables into this. 
# because it would be problematic if you could access the database like that.
# so for the admin console. we will do it for every single table. 
# we only have a single table, so it's not cumbersome anyways. hurray!

# make a class that defines it. and then we import that into wherever we need 
# to interact with the database.



class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": "users"} 
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Username - unique, required, max 255 characters
    username = Column(String(255), unique=True, nullable=False)
    
    # Email - unique, required, max 255 characters
    email = Column(String(255), unique=True, nullable=False)
    
    # Hashed password - required, max 255 characters
    hashed_password = Column(String(255), nullable=False)
    
    # First name 
    first_name = Column(String(100), nullable=False)
    
    # Last name 
    last_name = Column(String(100), nullable=False)
    
    # Date created 
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Last login 
    last_login = Column(DateTime(timezone=True), nullable=True)

# what I'll set up today is try to get the admin console working properly. and that'll be it.
# after that, we can figure out more about... everything else. y'know?
# like connecting users to creating users and everything else, y'nkow?