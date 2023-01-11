from fastapi import FastAPI
from routers import accounts, pets

app = FastAPI()
app.include_router(accounts.router)
app.include_router(pets.router)
