from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base

DATABASE_URL = "postgresql+asyncpg://postgres:your_password@localhost:5432/biy_ae_main_db"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)
Base = declarative_base()

# where i last ended off. 
# addign the admin console to this. 
# it's honestly not necessary, but I already started it and had the idea while I was doing the whole... 
# while doing the whole organization and it doesn't seem to extensive. I also wanna be able to see into the 
# database because it looks cool. 
# maybe I can also make a console for the mongodb too? 