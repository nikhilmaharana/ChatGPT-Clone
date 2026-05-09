from fastapi import (
    APIRouter,
    Depends
)

from app.models.chat_model import (
    ChatCreate
)

from app.controllers.chat_controller import (
    create_chat,
    get_user_chats,
    get_chat_by_id,
    update_chat,
    delete_chat
)

from app.middleware.auth_middleware import (
    verify_token
)

router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)

# CREATE CHAT
@router.post("/create")
async def create_new_chat(
    chat: ChatCreate,
    user = Depends(verify_token)
):

    return await create_chat(
        chat,
        user
    )

# GET ALL CHATS
@router.get("/all")
async def get_all_chats(
    user = Depends(verify_token)
):

    return await get_user_chats(
        user
    )

# GET SINGLE CHAT
@router.get("/{chat_id}")
async def get_single_chat(
    chat_id: str,
    user = Depends(verify_token)
):

    return await get_chat_by_id(
        chat_id,
        user
    )

# UPDATE EXISTING CHAT
@router.put("/update/{chat_id}")
async def update_existing_chat(
    chat_id: str,
    chat: ChatCreate,
    user = Depends(verify_token)
):

    return await update_chat(
        chat_id,
        [
            message.dict()
            for message in chat.messages
        ],
        user
    )
@router.delete("/delete/{chat_id}")
async def delete_existing_chat(
    chat_id: str,
    user = Depends(verify_token)
):

    return await delete_chat(
        chat_id,
        user
    )