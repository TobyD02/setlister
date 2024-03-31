# Instructions
1. Assign ```ENV REACT_NATIVE_PACKAGER_HOSTNAME``` in dockerfile to ip assigned by expo. This can be found by running npm start locally

    ```bash
    cd frontend
    npm start

    # In terminal output
    > Metro waiting on exp://'IPADDRESS':8081
    ```

2. Inside the frontend directory, run the following commands

    ```bash
    docker build -t setlister-frontend .
    ```
    ```bash
    docker run -it --rm --name setlister-frontend-container \
           -p 19001:19001 \
           -p 19002:19002 \
           -p 19006:19006 \
           setlister-frontend
    ```
