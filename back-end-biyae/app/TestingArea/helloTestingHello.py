from fastapi import APIRouter, HTTPException
import json
from pathlib import Path


# apply router to a variable. 
router = APIRouter()


@router.get("/TestingHello")
def TestingHello():
    return {"message": "Main app is running"}