import tensorflow as tf
from PIL import image
import os

# Load the TensorFlow model (update the path to where your trained model is saved)
model = tf.keras.models.load_model("path/to/your_skin_condition_model.h5")

def skin_analysis(filename: str):
    # Path where images are stored on the server
    image_path = f"backend_images/{filename}"
    
    try:
        # Load and preprocess the image
        img = image.load_img(image_path, target_size=(224, 224))  # Adjust size as needed for your model
        img_array = image.img_to_array(img)
        img_array = tf.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array /= 255.0  # Normalize if required by your model

        # Use the model to predict the condition, directly returning a string
        prediction = model.predict(img_array)
        condition = prediction[0]  # Assuming the model returns a single string label

        return {"condition": condition}
    
    except FileNotFoundError:
        return {"error": "File not found"}
    except Exception as e:
        return {"error": str(e)}

# Example usage:
# filename = "sample_image.jpg"
# result = skin_analysis(filename)
# print(result)
