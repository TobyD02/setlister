import os
import secrets


basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STATIC_FOLDER = f"{os.getenv('APP_FOLDER')}/src/static"
    MEDIA_FOLDER = f"{os.getenv('APP_FOLDER')}/src/media"
    JWT_SECRET_KEY = secrets.token_hex(32)

