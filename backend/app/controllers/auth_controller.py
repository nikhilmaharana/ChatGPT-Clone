from fastapi import HTTPException

from app.config.db import user_collection

from app.utils.password_handler import (
    hash_password,
    verify_password
)

from app.utils.jwt_handler import (
    create_access_token
)

async def signup_user(user):

    existing_user = (
        await user_collection.find_one({
            "email": user.email
        })
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = hash_password(
        user.password
    )

    user_data = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }

    result = await user_collection.insert_one(
        user_data
    )

    return {
        "message": "User created successfully",
        "user_id": str(result.inserted_id)
    }


async def login_user(user):

    existing_user = (
        await user_collection.find_one({
            "email": user.email
        })
    )

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    valid_password = verify_password(
        user.password,
        existing_user["password"]
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "user_id": str(existing_user["_id"]),
        "email": existing_user["email"]
    })

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": str(existing_user["_id"]),
            "username": existing_user["username"],
            "email": existing_user["email"]
        }
    }