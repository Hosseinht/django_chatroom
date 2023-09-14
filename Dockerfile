# base image
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get -y install libpq-dev libmagic1 gcc

WORKDIR /app

COPY ./requirements /app/requirements

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements/local.txt

COPY . /app

