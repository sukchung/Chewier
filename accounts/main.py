from fastapi import FastAPI
from routers import accounts, pets
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(pets.router)
