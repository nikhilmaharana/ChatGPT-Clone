import os

from groq import Groq

client = Groq(
    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)

SYSTEM_PROMPT = """
You are a modern AI assistant like ChatGPT.

Rules:
- Reply conversationally
- Keep responses visually clean
- Use markdown formatting
- Use headings when useful
- Use bullet points where needed
- Add spacing between sections
- Avoid giant dense paragraphs
- Sound natural and modern
- Use emojis occasionally
- Make answers visually pleasing
"""

async def generate_ai_response(
    prompt
):

    completion = (
        client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },

                {
                    "role": "user",
                    "content": prompt
                }

            ],

            temperature=0.7,

            max_tokens=2000,
        )
    )

    return (
        completion
        .choices[0]
        .message
        .content
    )