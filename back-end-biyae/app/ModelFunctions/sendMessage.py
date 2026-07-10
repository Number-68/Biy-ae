from fastapi import APIRouter, HTTPException
import json
from pathlib import Path
# connect to ollama via httpx
import httpx

# for post stuff
from pydantic import BaseModel

# apply router to a variable. 
router = APIRouter()

# CORS middleware
from fastapi.middleware.cors import CORSMiddleware


CHAT_FILE = Path("app/test-chat.json")

# defining expected type 
class MessageRequest(BaseModel):
    message: str



@router.post("/NewMessage")
def NewMessage(payload: MessageRequest):
    
    data = load_chat_history()

    print("Number of items:", len(data))
    for i, item in enumerate(data[:3]):  # print first 3
        print(f"Item {i}: type={type(item)}, value={item}")

    if data:
        next_id = max(item["id"] for item in data) + 1
    else:
        next_id = 1

    user_message = {
        "id": next_id,
        "role": "User",
        "message": payload.message
    }
    data.append(user_message)


    formatted_payload = transform_to_ollama_chat(data)
    
    # call ollama function (interchangeable) only call
    ollama_reply = call_ollama_chat(formatted_payload)
    # ollama_reply = call_ollama_generate(payload)

    # save reply
    assistant_id = next_id + 1
    assistant_message = {
        "id": assistant_id,
        "role": "Biy.Ae",
        "message": ollama_reply
    }
    data.append(assistant_message)

    # write to file
    with open(CHAT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    # return response
    return {
        "status": "ok",
        "user_id": next_id,
        "assistant_id": assistant_id,
        "reply": ollama_reply
    }



def load_chat_history():
    """Read the JSON file and return the raw list of messages."""

  
    if not CHAT_FILE.exists():
        return []  
    else:
        try:
            with open(CHAT_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Corrupt JSON file")



def transform_to_ollama_chat(chat_history):
    """Convert your stored format to Ollama's /api/chat messages array."""
    print("transforming json into ollama format")
    print(chat_history)
    
    
    ollama_messages = []
    for msg in chat_history:
        role_raw = msg["role"]
        role = "user" if role_raw == "User" else "assistant"
        ollama_messages.append({
            "role": role,
            "content": msg["message"]
        })

    print (ollama_messages)
    return ollama_messages



def call_ollama_generate(payload):
    # call ollama using chat instead of generate.
    OLLAMA_URL = "http://localhost:11434/api/generate"

    print("calling ollama service /generate")
    # debug message 
    print(payload)
    try:
        with httpx.Client(timeout=30.0) as client:
            ollama_payload = {
                "model": "tinyllama",          
                "prompt": payload.message,
                "stream": False
            }
            response = client.post(OLLAMA_URL, json=ollama_payload)
            response.raise_for_status()
            ollama_reply = response.json()["response"]

            return ollama_reply
    except Exception as e:
        # If Ollama fails, still save user message but return error
        raise HTTPException(status_code=502, detail=f"Ollama error: {str(e)}")


def call_ollama_chat(formatted_payload):
    OLLAMA_URL = "http://localhost:11434/api/chat"
    

    print("calling ollama service /chat")
    try:
        with httpx.Client(timeout=30.0) as client:
            ollama_payload = {
                "model": "tinyllama",          
                "messages": formatted_payload,
                "stream": False
            }


            # print(ollama_payload)
            response = client.post(OLLAMA_URL, json=ollama_payload)
            response.raise_for_status()
            ollama_reply = response.json()["message"]["content"]

            print(response)
            return ollama_reply
    except Exception as e:
        # If Ollama fails, still save user message but return error
        raise HTTPException(status_code=502, detail=f"Ollama error: {str(e)}")

