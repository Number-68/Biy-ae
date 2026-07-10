from fastapi import APIRouter, HTTPException
import json
from pathlib import Path

# apply router to a variable. 
router = APIRouter()

# define testjson file
CHAT_FILE = Path("app/test-chat.json")

# router out to main.
@router.get("/TotalChat")
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
