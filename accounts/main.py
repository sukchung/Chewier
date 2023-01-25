# import os
from fastapi import FastAPI
from routers import accounts, pets
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator


app = FastAPI()

app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(pets.router)

# os.environ.get("CORS_HOST", None),
origins = [
    "http://localhost:3000",
    "https://group-1-halas.gitlab.io",
    "CORS_HOST",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
