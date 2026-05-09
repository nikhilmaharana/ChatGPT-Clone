from bson import ObjectId

from app.config.db import (
    chat_collection,
)

async def create_chat(
    chat,
    user
):

    chat_data = {
        "user_id": user["user_id"],
        "title": chat.title,
        "messages": [
            message.dict()
            for message in chat.messages
        ]
    }

    result = await chat_collection.insert_one(
        chat_data
    )

    return {
        "message": "Chat created",
        "chat_id": str(result.inserted_id)
    }


async def get_user_chats(user):

    chats_cursor = (
        chat_collection.find({
            "user_id": user["user_id"]
        })
    )

    chats = []

    async for chat in chats_cursor:
        chats.append({
            "_id": str(chat["_id"]),
            "title": chat["title"]
        })

    return chats


async def get_chat_by_id(
    chat_id,
    user
):

    chat = await chat_collection.find_one({
        "_id": ObjectId(chat_id),
        "user_id": user["user_id"]
    })

    if not chat:
        return {
            "message": "Chat not found"
        }

    return {
        "_id": str(chat["_id"]),
        "title": chat["title"],
        "messages": chat["messages"]
    }
async def update_chat(
    chat_id,
    messages,
    user
):

    await chat_collection.update_one(
        {
            "_id": ObjectId(chat_id),
            "user_id": user["user_id"]
        },
        {
            "$set": {
                "messages": messages
            }
        }
    )

    return {
        "message": "Chat updated"
    }
async def delete_chat(
    chat_id,
    user
):

    await chat_collection.delete_one(
        {
            "_id": ObjectId(chat_id),
            "user_id": user["user_id"]
        }
    )

    return {
        "message": "Chat deleted"
    }