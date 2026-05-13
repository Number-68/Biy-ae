from fastapi import FastAPI



# apply instance to a variable
app = FastAPI()



# method .get defines an endpoint?
# @ is shorthand modifier
@app.get("/")



def root():
    
    return {"message": "Hello World"}



# logic to kinda get this thing up and running
# what do I want to do? 
# add a gitignore ofr local test files that are to be changed. 
# set up python to receive messages from react 
# set up python to parse that data into the local json file that acts as a immitation for messages 
# set up python to parse it to a bigger file containing all of the messages. 
# set up python to serve it back to react. 
# this is basically the loop that we have. and then processing the response with the LLm would be other things with that as well.
