# pull official base image
FROM python:3.11.3-slim-buster

# set work directory
WORKDIR /usr/src/backend

# Set environment variables

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1 
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update && apt-get install -y netcat

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/backend/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/backend/

# run entrypoint.sh
ENTRYPOINT ["/usr/src/backend/entrypoint.sh"]