# find_word.py
import os
from openai import OpenAI
from .generate_quiz import generate_quiz_options

# Function to process text and return the chosen word and quiz options
def get_chosen_word_and_quiz(text):
    # Read API keys
    api_key_path = './secrets/api_key.txt'
    api_org_path = './secrets/api_org.txt'
    
    with open(api_key_path, 'r') as file: 
        api_key = file.read().strip()
    
    with open(api_org_path, 'r') as file:
        api_org = file.read().strip()

    # Create OpenAI client
    myclient = OpenAI(api_key=api_key, organization=api_org)

    # Generate the word
    prompt = ("You are an educational tool to help people learn a new language. "
              "You will be provided with a sentence or a body of text and you to identify and select an ideal word to learn in a new language. "
              "Your output can ONLY be the single word you selected and no other text. "
              "Be sure Capitalize the first letter of your output word. Here's the text: \n") + text
              
    answer1 = myclient.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    chosen_word = answer1.choices[0].message.content

    # Generate the quiz options using the chosen word
    quiz_options = generate_quiz_options(chosen_word, api_key, api_org)

    print("DEBUG: Chosen word:", chosen_word)  # Debug print
    print("DEBUG: Quiz options:", quiz_options)  # Debug print
    return chosen_word, quiz_options
