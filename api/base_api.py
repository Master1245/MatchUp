from fastapi import FastAPI
from db import models
from db.database import engine
from fastapi.middleware.cors import CORSMiddleware
from api.auth import router as session_router
from api.get import router as get_router
from api.post import router as post_router
from api.put import router as put_router


models.Base.metadata.create_all(bind=engine)
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://127.0.0.1:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(get_router)
app.include_router(post_router)
app.include_router(put_router)
app.include_router(session_router)
