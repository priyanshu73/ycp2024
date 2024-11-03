import os
import google.generativeai as genai

# Configure API
api_key = "AIzaSyD0FFOMjLwM8f_7r-khltIh8bx1lnwlss8"
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

def get_personalized_skin_advice(user_condition, skin_type, concerns, age=None, gender=None):
    """
    Get personalized skin advice by combining user information with a template prompt
    Args:
        user_condition (str): User's current skin condition/issues
        skin_type (str): User's skin type (e.g., oily, dry, combination)
        concerns (str): Specific skin concerns
        age (str, optional): User's age
        gender (str, optional): User's gender
    Returns:
        str: AI-generated personalized skin care advice
    """
    # Create a comprehensive prompt template
    prompt_template = f"""
Based on the following user information, provide a brief clear and personalized skin care analysis in bullet points make it short like atmost 10 lines and treatment plan:

User Profile:
- Skin Type: {skin_type}
- Current Skin Condition: {user_condition}
- Main Concerns: {concerns}
{f'- Age: {age}' if age else ''}
{f'- Gender: {gender}' if gender else ''}

Please provide:
1. A detailed analysis of their skin condition
2. A personalized morning and evening skincare routine
3. Specific product recommendations and ingredients to look for
4. Treatment plan for their main concerns
5. Lifestyle and dietary recommendations
6. Additional tips and precautions

Please format the response in a clear, organized manner with appropriate sections and bullet points.
"""
    return get_ai_response(prompt_template)


def get_personalized_skin_advice(user_condition, skin_type, concerns, productList=None, age=None, gender=None):
    """
    Get personalized skin advice by combining user information with a template prompt.
    If a productList is provided, the AI will include suggestions from the list.
    Args:
        user_condition (str): User's current skin condition/issues
        skin_type (str): User's skin type (e.g., oily, dry, combination)
        concerns (str): Specific skin concerns
        productList (list, optional): List of available products in the store
        age (str, optional): User's age
        gender (str, optional): User's gender
    Returns:
        str: AI-generated personalized skin care advice with product suggestions if available
    """
    # Add product list to the prompt if provided
    product_suggestions = (
        f"\n\nThe following products are available in the store:\n{', '.join(productList)}\n"
        "Please suggest the best products from this list that match the skin care advice."
    ) if productList else ""

    # Create a concise and clear prompt template for the AI
    prompt_template = f"""
Based on the following user information, provide a brief, clear, and personalized skin care analysis in bullet points (up to 10 lines) and treatment plan:

User Profile:
- Skin Type: {skin_type}
- Current Skin Condition: {user_condition}
- Main Concerns: {concerns}
{f'- Age: {age}' if age else ''}
{f'- Gender: {gender}' if gender else ''}

Please provide:
1. A detailed analysis of their skin condition
2. A personalized morning and evening skincare routine
3. Specific product recommendations and ingredients to look for, based on available store products
4. Treatment plan for their main concerns
5. Lifestyle and dietary recommendations
6. Additional tips and precautions

{product_suggestions}

Please format the response in a clear, organized manner with appropriate sections and bullet points.
"""
    return get_ai_response(prompt_template)

#import this method in the ai model file,
def generate_skin_advice(user_condition, skin_type, concerns, age=None, gender=None):
    """
    A function to be called externally for generating skin advice.
    Args:
        user_condition (str): User's current skin condition/issues
        skin_type (str): User's skin type (e.g., oily, dry, combination)
        concerns (str): Specific skin concerns
        age (str, optional): User's age
        gender (str, optional): User's gender
    Returns:
        str: The personalized skin care advice generated by the AI
    """
    response = get_personalized_skin_advice(user_condition, skin_type, concerns, age, gender)
    print("Personalized Skin Analysis:")
    print(response)
    return response


def generate_skin_advice_store(user_condition, skin_type, concerns, productList, age=None, gender=None):
    """
    A function to be called externally for generating skin advice.
    Args:
        user_condition (str): User's current skin condition/issues
        skin_type (str): User's skin type (e.g., oily, dry, combination)
        concerns (str): Specific skin concerns
        age (str, optional): User's age
        gender (str, optional): User's gender
    Returns:
        str: The personalized skin care advice generated by the AI
    """
    response = get_personalized_skin_advice(user_condition, skin_type, concerns, age, gender)
    print("Personalized Skin Analysis:")
    print(response)
    return response

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
    
    response = generate_skin_advice_store(
        user_condition="Occasional acne breakouts with some dark spots",
        skin_type="Combination",
        concerns="Acne scarring and uneven texture",
        productList=store_products,
        age="25",
        gender="Female"
    )

    # Print the stored report
    stored_report = get_skin_analysis_report()
    print("\nStored Report:")
    print(stored_report)

# Entry point for standalone run
if __name__ == "__main__":
    # Example usage
    response = generate_skin_advice(
        user_condition="Occasional acne breakouts with some dark spots",
        skin_type="Combination",
        concerns="Acne scarring and uneven texture",
        age="25",
        gender="Female"
    )

    # Print the stored report
    stored_report = get_skin_analysis_report()
    print("\nStored Report:")
    print(stored_report)
