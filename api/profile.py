from bottle import request
from .app import app
from .app.models import User
from .app.utils import jsonify
from .app.auth import verify_auth_token


@app.get("/api/profile")
def get_profile(db):
    token = request.get_cookie("token")

    print("token", token)

    if token is None:
        return jsonify(status=401, message="You need to sign in.")
    data = verify_auth_token(token)
    email = data["user_email"]

    user = db.query(User).filter_by(email=email).first()

    if user is None:
        return jsonify(status=404, message="User does not exist.")

    return jsonify(status=200, message={"email": user.email})
