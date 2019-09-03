from bottle import request
from .app import app
from .app.auth import sign_in


@app.post("/api/signin")
def post_sign_in(db):
    email = request.POST.get("email")
    password = request.POST.get("password")

    return sign_in(db, email, password)
