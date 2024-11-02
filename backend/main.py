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
    # Read the image file
    image_content = await image.read()
    
    # Option 1: Process image directly from memory
    image_stream = io.BytesIO(image_content)
    img = Image.open(image_stream)
    
    # Get basic image information
    image_info = {
        "format": img.format,
        "size": img.size,
        "mode": img.mode,
        "width": img.width,
        "height": img.height,
        "aspect_ratio": round(img.width / img.height, 2),
        "file_size_kb": round(len(image_content) / 1024, 2)
    }
    
    # Option 2: Save file and get path (useful if your ML model needs a file path)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{image.filename}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    with open(filepath, "wb") as f:
        f.write(image_content)
    
    # Create response with both options
    response = {
        "user_info": {
            "name": name,
            "skin_type": skin_type
        },
        "image_info": image_info,
        "saved_file_path": filepath
    }
    
    # Here you would typically call your ML model
    # Example:
    # results = your_model.process_image(filepath)  # if model needs file path
    # or
    # results = your_model.process_image(image_content)  # if model accepts bytes
    
    return response

@app.get("/health")
async def health_check():
    return {"status": "healthy"}