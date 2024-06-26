# This file is for writing and running unit tests on our application's endpoint.

import unittest as ut # Importing it as 'ut' to avoid writing unittest everytime we use the module
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

    # Tests for refresh tokens
    def test_refresh(self):
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
        refresh_token = login_response.json['refresh_token']

        headers = {
            "Authorization": f"Bearer {refresh_token}"
        }

        refresh_response = self.client.post("/auth/refresh", headers=headers)

        status_code = refresh_response.status_code

        self.assertEqual(status_code, 200)

    # A test to get all tasks
    def test_get_tasks(self):
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
        access_token = login_response.json["access_token"] # Accessing our access_token from the login response

        header = {
            "Authorization": f"Bearer {access_token}"
        }

        test_response = self.client.get("/tasks/get-tasks", headers = header)

        status_code = test_response.status_code

        self.assertEqual(status_code, 200)

    # A test to post a task
    def test_post(self):
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
        access_token = login_response.json["access_token"] # Accessing our access_token from the login response

        header = {
            "Authorization": f"Bearer {access_token}"
        }

        task = {
            "task": "Test Tasks",
            "due_date": "9:00AM",
            "task_done": False,
        }

        task_response = self.client.post("/tasks/post", json=task, headers=header)

        status_code = task_response.status_code

        self.assertEqual(status_code, 201)
        

    # This function tears down the test database after running tests
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    ut.main()
