from flask import Flask, jsonify, send_from_directory, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from flask_cors import CORS
from functools import wraps
import os


app = Flask(__name__)
app.config.from_object("src.config.Config")
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Import models after db is initialised
from src.models import *

# Allow cors in dev
if os.environ.get("ALLOW_CORS"):
    CORS(app)


@app.route("/")
def index():
    return jsonify(hello="world")


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(*args, **kwargs)

    return decorated


@app.route('/api/refresh_token', methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify({'token': access_token})

@app.route('/api/protected')
@token_required
def protected():
    return jsonify({'message': 'Protected Route Accessed!'})


@app.route("/api/auth", methods=["POST"])
def login():
    data = request.json
    print(data)

    # Check if required fields are present
    if not (data.get('email') and data.get('password')) and not (data.get('username') and data.get('password')):
        return jsonify({'error': 'Email/Username and password are required'}), 400

    user = None

    # Check if login using email
    if data.get('email'):
        user = User.query.filter_by(email=data['email']).first()

    # Check if login using username
    if not user and data.get('username'):
        user = User.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid email/username or password'}), 401

    # Generate access token
    access_token = create_access_token(identity=user.id)

    return jsonify({'message': 'Login successful', 'token': access_token})


@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.json
    print(data)

    # Check if required fields are present
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Username, email, and password are required'}), 400

    # Check if the email is already in use
    if User.query.filter_by(email=data['email']).first():
        print("Printing:",User.query.filter_by(email=data['email']).first())
        return jsonify({'error': 'Email address is already in use'}), 409

    role = 'user'
    if data.get('is_admin'):
        role = 'admin'

    # Create a new user instance
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        role=role
    )

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Generate access token
    access_token = create_access_token(identity=new_user.id)

    return jsonify({'message': 'User created successfully', 'token': access_token}), 201


# Static Files
@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

# Media Files


@app.route("/media/<path:filename>")
def mediafiles(filename):
    return send_from_directory(app.config["MEDIA_FOLDER"], filename)


@app.route("/upload", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        file = request.files["file"]
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["MEDIA_FOLDER"], filename))
    return """
    <!doctype html>
    <title>upload new File</title>
    <form action="" method=post enctype=multipart/form-data>
      <p><input type=file name=file><input type=submit value=Upload>
    </form>
    """
