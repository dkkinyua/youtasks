# This Python file holds the configuration files for our Flask application
from dotenv import load_dotenv
import os

load_dotenv()

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

# This configuration class acts as a parent class to the other configuration classes as the other classes will inherit these properties from Config
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# This configuration class is for development only and not production which we will use when developing the API, inherits from Config.
class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///"+os.path.join(BASE_DIR, "dev.db")
    DEBUG = True
    SQLALCHEMY_ECHO = False

# This configuration class is for production only which we will use when we are deploying the whole application, inherits from Config. We will 'pass' this for now till production
class ProductionConfig(Config):
    pass

# This configuration class is for running unit tests only which we will use when we are testing the APIs endpoints, inherits from Config. We will 'pass' this for now till unit testing
class TestConfig(Config):
    pass