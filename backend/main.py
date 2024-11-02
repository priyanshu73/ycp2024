from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
import shutil
import os

app = FastAPI()

@app.post("/analyze/")
async def analyze_skin(
    name: str = Form(...),
    skin_type: str = Form(...),
    file: UploadFile = File(...)
):
    # Save the uploaded file
    file_location = f"uploaded_images/{file.filename}"
    
    # Ensure the upload directory exists
    os.makedirs(os.path.dirname(file_location), exist_ok=True)
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    #AI MODEL AND 
    treatment_plan = "Your AI model will generate a treatment plan based on the uploaded image."

    return JSONResponse(content={
        "message": "Image uploaded and analyzed successfully",
        "name": name,
        "skin_type": skin_type,
        "treatment_plan": treatment_plan
    })

# Optionally, if you want to see if the server is running
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Skin Analysis API!"}

@app.get("/history/{name}")
async def get_skin_analysis_history(name: str):
    # Retrieve the analysis records for the given user name
   
    
    if not "write code here":
        return JSONResponse(content={"message": "No history found for this user."}, status_code=404)
    
    return JSONResponse(content={"history": "not thing"})