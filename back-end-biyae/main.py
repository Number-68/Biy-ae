from fastapi import FastAPI


# for total chat
import json
from pathlib import Path
from fastapi import HTTPException

# CORS middleware
from fastapi.middleware.cors import CORSMiddleware







# define testjson file
CHAT_FILE = Path("test-chat.json")



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


# logic must be done to compare, no? what other logic could I do to ensure that we aren't like completely, constantly, 
# resending the entire chat? 
# at the start of a chat, there should be only a singular moment where the frontend requests the ENTIRE chat. 
# then, everything else should be parsing the most recent, no? 
# I think the backend should have a copy of the chat, no? and then it compares the whole chat and sends what isn't there?
# see what examples other people do?

# @app.post("/NewMessage")
# def NewMessage():
    
    # if no chatjson exists, make it. 
    # if chat.json exists, add to it the new message.

# logic to kinda get this thing up and running
# what do I want to do? 
# add a gitignore ofr local test files that are to be changed. 
# set up python to receive messages from react 
# set up python to parse that data into the local json file that acts as a immitation for messages 
# set up python to parse it to a bigger file containing all of the messages. 
# set up python to serve it back to react. 
# this is basically the loop that we have. and then processing the response with the LLm would be other things with that as well.

# todo: fix up entire architecture a bit.
# we're going to try to fix it up. backend system is the source of truth. 
# front end system is just a represenation 
# for now, I think i have to rebuild--or at least modify--the ffront end to have usestates now... just to have it without the .json file. 
# for that, we're goign to also have to make it load a full conversation. y'know?

# run with uvicorn main:app --reload