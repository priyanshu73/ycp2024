import os
import google.generativeai as genai
import json

# Configure API
api_key = ""
genai.configure(api_key=api_key)

# Configuration settings
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Create the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Start chat session
chat_session = model.start_chat(history=[])

# Variable to store the skin analysis report
skin_analysis_report = ""

def get_ai_response(prompt):
    """
    Get a response from the AI for a given prompt
    Args:
        prompt (str): The input prompt to send to the API
    Returns:
        str: The response from the API
    """
    global skin_analysis_report
    try:
        response = chat_session.send_message(prompt)
        skin_analysis_report = response.text
        return skin_analysis_report
    except Exception as e:
        error_message = f"Error getting response: {str(e)}"
        print(error_message)
        return error_message

def get_skin_analysis_report():
    """Return the stored skin analysis report"""
    return skin_analysis_report



import json

def get_personalized_skin_advice(user_condition, skin_type, concerns, productList=None, age=None, gender=None):
    """
    Get personalized skin advice with error handling and response validation.
    Args:
        user_condition (str): User's current skin condition/issues
        skin_type (str): User's skin type (e.g., oily, dry, combination)
        concerns (str): Specific skin concerns
        productList (list, optional): List of available products in the store
        age (str, optional): User's age
        gender (str, optional): User's gender
    Returns:
        dict: AI-generated personalized skincare advice or a default structured response
    """
    
    product_context = (
        f"\n\nAvailable products for recommendations:\n{', '.join(productList)}"
    ) if productList else ""

    prompt_template = f"""
Please respond ONLY with a valid JSON object containing skincare recommendations. The response should start with '{{' and end with '}}' and follow this exact structure:

{{
    "overview": {{
        "condition": "{skin_type} skin with {user_condition}",
    }},
    "routine": {{
        "morning": [
            "Gentle cleanser",
            "Hydrating toner",
            "Moisturizer",
            "Sunscreen"
        ],
        "evening": [
            "Oil-based cleanser",
            "Gentle cleanser",
            "Treatment serum",
            "Night cream"
        ]
    }},
    "diet": {{
        "recommendations": [
            "Increase water intake",
            "Eat omega-3 rich foods",
            "Include antioxidant-rich fruits",
            "Add collagen-boosting foods"
        ]
    }},
    "products": [
        {{
            "name": "Sample Gentle Cleanser",
            "price": 24.99,
            "description": "Gentle, non-stripping cleanser for {skin_type} skin",
            "keyIngredients": [
                "Ceramides",
                "Hyaluronic Acid",
                "Glycerin"
            ],
            "bestFor": "Daily cleansing",
            "useTime": "Morning and evening"
        }}
    ]
}}

Based on:
- Skin Type: {skin_type}
- Current Condition: {user_condition}
- Concerns: {concerns}
{f'- Age: {age}' if age else ''}
{f'- Gender: {gender}' if gender else ''}
{product_context}

Provide ONLY the JSON response, no additional text or explanations."""

    try:
        # Get AI response
        response = get_ai_response(prompt_template)
        
        # Debug: Print raw response
        print("Raw AI Response:", response)
        
        # Try to parse the response as JSON
        try:
            parsed_data = json.loads(response)
            return parsed_data
        except json.JSONDecodeError as e:
            # If JSON parsing fails, create a basic valid response
            print(f"JSON Parsing Error: {e}")
            print("Response that caused error:", response)
            
            # Return a default structured response
            return {
                "overview": {
                    "condition": f"{skin_type} skin with {user_condition}",
                },
                "routine": {
                    "morning": [
                        "Gentle cleanser",
                        "Moisturizer",
                        "Sunscreen"
                    ],
                    "evening": [
                        "Cleanser",
                        "Treatment",
                        "Night cream"
                    ]
                },
                "diet": {
                    "recommendations": [
                        "Increase water intake",
                        "Eat more fruits and vegetables",
                        "Include healthy fats",
                        "Avoid processed foods"
                    ]
                },
                "products": [
                    {
                        "name": "Basic Gentle Cleanser",
                        "price": 19.99,
                        "description": f"Gentle cleanser for {skin_type} skin",
                        "keyIngredients": ["Ceramides", "Glycerin"],
                        "bestFor": "Daily cleansing",
                        "useTime": "Morning and evening"
                    }
                ]
            }
            
    except Exception as e:
        print(f"General Error: {e}")
        # Return the same default response structure as above
        return {
            "overview": {
                "condition": f"{skin_type} skin with {user_condition}",
            },
            "routine": {
                "morning": ["Gentle cleanser", "Moisturizer", "Sunscreen"],
                "evening": ["Cleanser", "Treatment", "Night cream"]
            },
            "diet": {
                "recommendations": [
                    "Increase water intake",
                    "Eat more fruits and vegetables",
                    "Include healthy fats",
                    "Avoid processed foods"
                ]
            },
            "products": [
                {
                    "name": "Basic Gentle Cleanser",
                    "price": 19.99,
                    "description": f"Gentle cleanser for {skin_type} skin",
                    "keyIngredients": ["Ceramides", "Glycerin"],
                    "bestFor": "Daily cleansing",
                    "useTime": "Morning and evening"
                }
            ]
        }


def generate_skin_advice_store(user_condition, skin_type, concerns, productList, age=None, gender=None):
    """
    A function to be called externally for generating skin advice with store-specific products.
    Args:
        user_condition (str): User's current skin condition/issues
        skin_type (str): User's skin type (e.g., oily, dry, combination)
        concerns (str): Specific skin concerns
        productList (list): List of available products in the store
        age (str, optional): User's age
        gender (str, optional): User's gender
    Returns:
        str: The personalized skin care advice generated by the AI, with product suggestions from the store
    """
    response = get_personalized_skin_advice(user_condition, skin_type, concerns, productList, age, gender)
    print("Personalized Skin Analysis with Store Product Recommendations:")
    print(response)
    return response

# Entry point for standalone run
if __name__ == "__main__":
    # Example usage with a list of store products
    store_products = [
        "Hydrating Cleanser", "Vitamin C Serum", "Retinol Night Cream",
        "Hyaluronic Acid Moisturizer", "SPF 50 Sunscreen"
    ]
    
    response = get_personalized_skin_advice(
        user_condition="Dark circles",
        skin_type="Combination",
        concerns="Very dark puffy eyes",
        productList=[],
        age="25",
        gender="Male"
    )

    # Print the stored report
    stored_report = get_skin_analysis_report()
    print("\nStored Report:")
    print(stored_report)


