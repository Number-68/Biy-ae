from fastapi import FastAPI

# for post stuff
from pydantic import BaseModel

# for total chat
import json
from pathlib import Path
from fastapi import HTTPException

# CORS middleware
from fastapi.middleware.cors import CORSMiddleware

# Admin console 
from sqladmin import Admin, ModelView
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import RedirectResponse

from app.DatabaseStuff.database import engine, Base
from app.DatabaseStuff.models import User



CHAT_FILE = Path("app/test-chat.json")


# apply instance to a variable
app = FastAPI()

# --------ENDPOINTS--------

# test imports
from app.TestingArea.helloTestingHello import router as helloTestingHello
app.include_router(helloTestingHello)

# model functions
from app.ModelFunctions.totalChats import router as totalChats
app.include_router(totalChats)

from app.ModelFunctions.sendMessage import router as sendMessage

app.include_router(sendMessage)

# admin console

class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username = form.get("username")
        password = form.get("password")
        
        # Hardcoded credentials – change these to your own
        if username == "admin" and password == "your_password_here":
            request.session.update({"token": "logged_in"})
            return True
        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        return bool(request.session.get("token"))

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.username, User.email, User.first_name, User.last_name, User.created_at, User.last_login]
    column_searchable_list = [User.username, User.email, User.first_name, User.last_name]


authentication_backend = AdminAuth(secret_key="randomrandomrandom")




admin = Admin(app, engine, authentication_backend=authentication_backend)

admin.add_view(UserAdmin)




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



# define the data needed for the post.
class SignupRequest(BaseModel):
    email: str
    username: str
    givenName: str
    surname: str
    password: str
    confirmPassword: str


# interface for signup. 
@app.post("/signup")
def SignUp(payload: SignupRequest):

    # ---- parse data

    # ---- validate data.
    # clean data?
    # 

    # ---- process the data 
    # hash the password immediately.

    # get response.
    return {
        # send response success or fail.
        "message": "Main app is running"
        }







# run with uvicorn app.main:app --reload
# do this from outside of app\ in the root of our backend

# todo next: start working with mongoDB and postgreSQL. 
# next: figure out how to make users from signin. 
# then figure out how to long in and ensure a user session is their own.