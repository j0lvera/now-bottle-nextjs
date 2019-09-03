from bottle import Bottle
from bottle.ext import sqlalchemy
from .models import engine, Base

app = Bottle()

sqlalchemy_plugin = sqlalchemy.Plugin(engine, Base.metadata, keyword="db", create=True)

app.install(sqlalchemy_plugin)
