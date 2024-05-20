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

    def test_hello(self):
        test_response = self.client.get("/tasks/hello")

        status_code = test_response.status_code

        self.assertEqual(status_code, 200)

    # Test for signup
    def test_signup(self):
        test = {
            "username": "test",
            "email": "test@test.com",
            "password": "password"
        }

        signup_response = self.client.post("/auth/signup", json=test)

        status_code = signup_response.status_code

        self.assertEqual(status_code, 201)

    # Test for login
    def test_login(self):
        test = {
            "username": "test",
            "email": "test@test.com",
            "password": "password"
        }

        signup_response = self.client.post("/auth/signup", json=test)

        login = {
            "username": "test",
            "password": "password"
        }

        login_response = self.client.post("/auth/login", json=login)

        status_code = login_response.status_code

        self.assertEqual(status_code, 200)
        

    # This function tears down the test database after running tests
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    ut.main()
