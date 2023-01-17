from fastapi import FastAPI
from routers import inventory


app = FastAPI()

app.include_router(inventory.router)

#CORS goes in here for React
