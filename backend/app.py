"""
Kannamma - Maternal Health Voice Guardian
Flask Backend Application (Initial Setup)
"""
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from config import Config
from extensions import db

load_dotenv()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    CORS(app, origins=app.config.get("CORS_ORIGINS", []))
    JWTManager(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
