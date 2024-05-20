# This file is for writing and running unit tests on our application's endpoint.

import unittest as ut
from main import create_app
from models import User
from exts import db
from config import TestConfig

class APITestCase(ut.TestCase):
    # This function sets up testing and creates tables in the test database
    def setUp(self):
        self.app = create_app(TestConfig) #Imports the application's setting with the Testing configurations.
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()

    # This function tears down the test database after running tests
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    ut.main()
