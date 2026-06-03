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



# todo next: connect the api here and try to make a complete feedback loop that works! hurray!
# now, what I'll do is kinda catch up this version to the main.





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
        return data
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Chat file is corrupted")


@app.post("/NewMessage")
def NewMessage(payload: MessageRequest):


    # if not exists, create
    if not CHAT_FILE.exists():
        data = []
    else:
        try:
            with open(CHAT_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Corrupt JSON file")
    
    
    if data:
        next_id = max(item["id"] for item in data) + 1
    else:
        next_id = 1



    new_message = {
        "id": next_id,
        "role": "User",
        "message": payload.message
    }


    data.append(new_message)
    with open(CHAT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    return {"status": "ok", "id": next_id}

# run with uvicorn main:app --reload