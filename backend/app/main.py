from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import (
    router as auth_router
)

from app.routes.chat_routes import (
    router as chat_router
)

from app.routes.ai_routes import (
    router as ai_router
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

app.include_router(chat_router)

app.include_router(ai_router)

@app.get("/")
async def root():
    return {
        "message": "Backend running"
    }