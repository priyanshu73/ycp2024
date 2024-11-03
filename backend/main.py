from fastapi import FastAPI, File, UploadFile, Form
from PIL import Image
import io
import user
from database import engine
import models
import uvicorn
from dotenv import load_dotenv
import os
from aiModel import skin_analysis


# Load environment variables
load_dotenv()

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Skin Analysis API")

# Include user routes
app.include_router(user.router, prefix="/api")

# case 1: one endpoint without userinfo, only the image + extra info(age and stuff)
# case 2: one endpoint with userinfo, image + extra info(age and stuff)

# case 2
@app.post("/userInfo")
async def analyze_skin(
    image: UploadFile = File(...),
    name: str = Form(...),
    skin_type: str = Form(...),
    # remote email later, this is for the store setup
    email: str = Form(...),
    age: int = Form(...)
):
    try:
        # Read the image file
        image_content = await image.read()
        
        # Process image and get basic information
        image_stream = io.BytesIO(image_content)
        img = Image.open(image_stream)
        UPLOAD_DIR = "uploads"
        filepath = os.path.join(UPLOAD_DIR, image.filename)
        
        # Save the image
        with open(filepath, "wb") as f:
            f.write(image_content)
        #AI PART
        
    
        
        # Basic image information for testing
        image_info = {
            "filename": image.filename,
            "content_type": image.content_type,
            "format": img.format,
            "size": img.size,
            "width": img.width,
            "height": img.height,
            "file_size_kb": round(len(image_content) / 1024, 2)
        }
        
        
        skinReport = skin_analysis
        # Test response
        response = {
            "status": "success",
            "message": "Image successfully processed",
            "user_data": {
                "name": name,
                "skin_type": skin_type,
                "email": email,
                "age": age
            },
            "image_data": image_info
        }
        
        return response
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

# Include skin analysis routes
app.include_router(skin_analysis.router, prefix="/api")