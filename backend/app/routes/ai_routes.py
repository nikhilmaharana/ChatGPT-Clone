from fastapi import APIRouter

from pydantic import BaseModel

from app.services.ai_service import (
    generate_ai_response
)

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"]
)

class PromptRequest(BaseModel):
    prompt: str

@router.post("/chat")
async def ai_chat(
    data: PromptRequest
):

    response = await generate_ai_response(
        data.prompt
    )

    return {
        "response": response
    }