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

print("Chatbot initialized! Type 'quit' to exit.")
print("=" * 50)

while True:
    user_input = input("\nYou: ").strip()
    
    if user_input.lower() in ['quit', 'exit', 'bye']:
        print("\nGoodbye!")
        break
        
    try:
        response = chat_session.send_message(user_input)
        print("\nBot:", response.text)
    except Exception as e:
        print(f"\nError: {str(e)}")