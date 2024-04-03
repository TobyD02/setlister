from flask.cli import FlaskGroup
from src import app, db
from src.models import User
import datetime


cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    new_user = User(
        username='example',
        email='example@email.com',
        password='password123',
    )
    db.session.add(new_user)
    db.session.commit()


if __name__ == "__main__":
    cli()
