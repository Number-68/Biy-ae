from fastapi import FastAPI

# for total chat
import json
from pathlib import Path
from fastapi import HTTPException

# CORS middleware
from fastapi.middleware.cors import CORSMiddleware


CHAT_FILE = Path("app/test-chat.json")


# apply instance to a variable
app = FastAPI()

# api imports

# test imports
from app.TestingArea.helloTestingHello import router as helloTestingHello
app.include_router(helloTestingHello)

# model functions
from app.ModelFunctions.totalChats import router as totalChats
app.include_router(totalChats)

from app.ModelFunctions.sendMessage import router as sendMessage

app.include_router(sendMessage)

# admin console








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






# interface for signup. 
# @app.get("/TotalChat")
# def TotalChat():







# run with uvicorn app.main:app --reload
# do this from outside of app\ in the root of our backend

# todo next: start working with mongoDB and postgreSQL. 
# ez pz. but you can go install them right away.