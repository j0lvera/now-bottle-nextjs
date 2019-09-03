from bottle import request
from .app import app


@app.get("/api")
def index():
    return "Hello, World!"
