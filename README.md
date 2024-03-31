# Setlister 

## Overview
A fully dockerised full-stack crossplatform application, using a postgres database, a flask backend api with nginx, and a react-native frontend using expo. 

## Dependencies
- Docker
- Docker Compose

## Installation

1. ### Setup

    1. Firstly, in the root directory, create a .env.dev, or .env.prod file. This will depend on whether you are building the app for development or production purposes. 
        - **Example .env.dev**
            ```bash
            # Flask app python file
            FLASK_APP=src/__init__.py

            # Flask debug mode
            FLASK_DEBUG=1

            # Database URL
            DATABASE_URL=postgresql://hello_flask:hello_flask@db:5432/hello_flask_dev

            # Database credentials
            SQL_HOST=db
            SQL_PORT=5432
            DATABASE=postgres

            # Backend directory within container, used for static and media files 
            APP_FOLDER=/usr/src/backend

            # EXPO connection url (found by running expo app locally)
            REACT_NATIVE_PACKAGER_HOSTNAME="XXX.XXX.X.XXX:"

            # Backend exposed API url
            EXPO_PUBLIC_API_URL="http://XXX.XXX.X.XXX:5001/"

            # Allow CORS (used for dev)
            ALLOW_CORS = True
            ```
        - REACT_NATIVE_PACKAGE_HOSTNAME and EXPO_PUBLIC_API_URL should be your local machines ipv4 address. One method for finding this is by running the front end locally using:
            ```bash
            npm install && npm start
            ``` 
            In the logs, the correct IP address will be shown:
            ```bash
            > Metro waiting on exp://XXX.XXX.X.XXX:PORT
            ```
    2. If building for production, you will need to create a .env.prod.db file containing the database credentials:
        ```bash
        POSTGRES_USER=hello_flask
        POSTGRES_PASSWORD=hello_flask
        POSTGRES_DB=hello_flask_prod
        ```



2. ### Building and Running

    ***IMPORTANT*** - If you are running using dockers desktop application, it is highly recommended that you disabled background SBOM indexing under ```settings > Features in development > Experimental features```. Keeping this enabled causes the build to use a large amount of memory.

    Also, the production build for this app doesnt currently export the front-end as this has different requirements for each platform.
    
- **Development**
    ```bash
    docker-compose up -d --build
    ```

- **Production**
    ```bash
    docker-compose -f docker-compose.prod.yml up -d --build

    # Execute the following to create and seed the database
    docker-compose -f docker-compose.prod.yml exec backend python manage.py create_db
    ```

- **To access the frontend** - execute the command:
    ```bash
    docker-compose logs frontend
    ```

    Accessing the frontend containers logs provide you with a link to the localhost url where the web app can be accessed,
    ```bash
    > Metro waiting on exp://XXX.XXX.X.XXX:19001
    > Web is waiting on http://localhost:19001
    ```
     or if you have the expo app installed on your mobile device you can scan the QR code.

3. ### Taking Down
    ```bash
    # Development Build
    docker-compose down -v

    # Production Build
    docker-compose -f docker-compose.prod.yml down -v
    ```