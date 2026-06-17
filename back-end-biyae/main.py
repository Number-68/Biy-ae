from fastapi import FastAPI


# for total chat
import json
from pathlib import Path
from fastapi import HTTPException


# CORS middleware
from fastapi.middleware.cors import CORSMiddleware


# for post stuff
from pydantic import BaseModel


# connect to ollama via httpx
import httpx








# define testjson file
CHAT_FILE = Path("test-chat.json")


# defining expected type 
class MessageRequest(BaseModel):
    message: str



# apply instance to a variable
app = FastAPI()



# method .get defines an endpoint?
# @ is shorthand modifier
@app.get("/")
def root():
    
    return {"message": "Hello World"}




app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/TotalChat")
def TotalChat():
    # if not exists, create
    if not CHAT_FILE.exists():
        with open(CHAT_FILE, "w", encoding="utf-8") as f:
            json.dump([], f, indent=2)
    # this is just a test, probalby delete later when full system works.

    
    # parse and send data
    try:
        with open(CHAT_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            print(data)
        return data
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Chat file is corrupted")

@app.post("/NewMessage")
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













# run with uvicorn main:app --reload

# todo next: start working with mongoDB and postgreSQL. ez pz. but you can go install them right away.