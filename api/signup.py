from bottle import request
from .app import app
from .app.utils import jsonify
from .app.auth import sign_up


@app.post("/api/signup")
def post_sign_up(db):
    email = request.POST.get("email")
    password = request.POST.get("password")

    try:
        user = sign_up(db, email, password)
        return jsonify(status=201, message={"message": "User created", "data": user})
    except Exception as e:
        print("error trying to signup", e)
        return jsonify(status=500, message="something went wrong")
