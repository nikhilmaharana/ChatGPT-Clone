from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    role: str
    content: str

class ChatCreate(BaseModel):
    title: str
    messages: List[Message]