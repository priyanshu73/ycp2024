from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
from PIL import Image
import io
import os
from datetime import datetime

app = FastAPI()

class SkinInfo(BaseModel):
    name: str
    skin_type: str

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/analyze")
async def analyze_skin(
    image: UploadFile = File(...),
    name: str = Form(...),
    skin_type: str = Form(...)
):
    try:
        # Read the image file
        image_content = await image.read()
        
        # Process image and get basic information
        image_stream = io.BytesIO(image_content)
        img = Image.open(image_stream)
        
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
        
        # Test response
        response = {
            "status": "success",
            "message": "Image successfully processed",
            "user_data": {
                "name": name,
                "skin_type": skin_type
            },
            "image_data": image_info
        }
        
        return response
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}