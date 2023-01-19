import os
from fastapi import FastAPI
from routers import inventory
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(inventory.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
