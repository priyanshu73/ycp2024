import tensorflow as tf
from PIL import image
import os

LABELS = [
    'Acne and Rosacea Photos',
    'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions',
    'Atopic Dermatitis Photos',
    'Bullous Disease Photos',
    'Cellulitis Impetigo and other Bacterial Infections',
    'Eczema Photos',
    'Exanthems and Drug Eruptions',
    'Hair Loss Photos Alopecia and other Hair Diseases',
    'Herpes HPV and other STDs Photos',
    'Light Diseases and Disorders of Pigmentation',
    'Lupus and other Connective Tissue diseases',
    'Melanoma Skin Cancer Nevi and Moles',
    'Nail Fungus and other Nail Disease',
    'Poison Ivy Photos and other Contact Dermatitis',
    'Psoriasis pictures Lichen Planus and related diseases',
    'Scabies Lyme Disease and other Infestations and Bites',
    'Seborrheic Keratoses and other Benign Tumors',
    'Systemic Disease',
    'Tinea Ringworm Candidiasis and other Fungal Infections',
    'Urticaria Hives',
    'Vascular Tumors',
    'Vasculitis Photos',
    'Warts Molluscum and other Viral Infections'
]

# Load the TensorFlow model (update the path to where your trained model is saved)
model = tf.keras.models.load_model("./model/tf_model.keras")

def skin_analysis(filename: str):
    # Path where images are stored on the server
    image_path = f"uploads/{filename}"
    
    try:
        # Load and preprocess the image
        img = image.load_img(image_path, target_size=(224, 224))  # Adjust size as needed for your model
        img_array = image.img_to_array(img)
        img_array = tf.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array /= 255.0  # Normalize if required by your model

        # Use the model to predict the condition, directly returning a string
        prediction = model.predict(img_array)
        condition = LABELS[prediction.argmax()]

        return {"condition": condition}
    
    except FileNotFoundError:
        return {"error": "File not found"}
    except Exception as e:
        return {"error": str(e)}

# Example usage:
# filename = "sample_image.jpg"
# result = skin_analysis(filename)
# print(result)
