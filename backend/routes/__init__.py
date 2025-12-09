from flask import Blueprint

def register_routes(app):
    from .auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
