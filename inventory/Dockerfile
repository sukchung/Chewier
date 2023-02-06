FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY main.py main.py

COPY routers routers
COPY queries queries
COPY migrations migrations

RUN python -m pip install -r requirements.txt
CMD python -m migrations up && uvicorn main:app --reload --host 0.0.0.0
