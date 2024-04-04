from . import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Sequence
import re

import re
from sqlalchemy.orm import column_property

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.BigInteger, Sequence(
        'user_id_seq', start=1000000000), primary_key=True)
    username = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String, default='user', nullable=False)
    created_at = db.Column(
        db.TIMESTAMP, default=datetime.utcnow, nullable=False)

    def __init__(self, username, email, password, role=None):
        
        if not self.check_email(email):  # Validate email
            raise ValueError('Invalid email address')
        
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)
        self.role = role

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def check_email(self, value):
        email_regex = r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$'
        return re.match(email_regex, value) is not None





class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bio = db.Column(db.Text)
    instruments = db.Column(db.Text)
    genres = db.Column(db.Text)
    setlists = db.Column(db.Text)
    experience = db.Column(db.Text)
    available_dates = db.Column(db.Text)
    location = db.Column(db.String)
    travel_distance = db.Column(db.Float)


class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.Text)
    recurring_type = db.Column(db.String)
    start_date = db.Column(db.TIMESTAMP)
    end_date = db.Column(db.TIMESTAMP)
    start_time = db.Column(db.TIMESTAMP)
    end_time = db.Column(db.TIMESTAMP)
    genres = db.Column(db.Text)
    instruments = db.Column(db.Text)
    location = db.Column(db.String)
    posted_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.TIMESTAMP)
