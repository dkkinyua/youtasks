from config import DevelopmentConfig
from main import create_app

if __name__ == "__main__":
        
    app = create_app(DevelopmentConfig)
    app.run(debug=True)

        