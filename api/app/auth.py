import os
from passlib.hash import bcrypt
from bottle import response
from itsdangerous import TimedJSONWebSignatureSerializer, SignatureExpired, BadSignature
from sqlalchemy import exists
from .models import User
from .utils import jsonify


SECRET = os.getenv("SECRET")


class AuthException(Exception):
    pass


def generate_auth_token(payload, expiration=3600):
    serializer = TimedJSONWebSignatureSerializer(SECRET, expires_in=expiration)
    return serializer.dumps(payload).decode("utf-8")


def verify_auth_token(token):
    serializer = TimedJSONWebSignatureSerializer(SECRET)
    try:
        data = serializer.loads(token)
    except SignatureExpired as e:
        print(e)
        raise AuthException("Token is expired.")
    except BadSignature as e:
        print(e)
        raise AuthException("Token is invalid.")
    return data


def user_exists(db_session, email):
    return db_session.query(exists().where(User.email == email)).scalar()


def sign_up(db_session, email, password):
    user = User(email=email, password=bcrypt.hash(password))
    db_session.add(user)
    db_session.commit()

    return {
        "auth_token": str(generate_auth_token(user.id)),
        "email": user.email,
        "user_id": user.id,
    }


def sign_in(db_session, email, password):
    user = db_session.query(User).filter_by(email=email).first()

    if user is None:
        return jsonify(status=404, message="User does not exist.")

    if bcrypt.verify(password, user.password):
        token = generate_auth_token({"user_id": user.id, "user_email": user.email})
        response.set_cookie("token", token, path="/", httponly=False)
        return jsonify(status=200, message="User signed in.")
    else:
        return jsonify(status=401, message="Wrong password.")
