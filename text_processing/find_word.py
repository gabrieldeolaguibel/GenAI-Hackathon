# find_word.py
import os
from openai import OpenAI
from .generate_quiz import generate_quiz_options

# Function to process text and return the chosen word and quiz options
def get_chosen_word_and_quiz(text):
    # Read API keys
    api_key_path = './text_processing/api_key.txt'
    api_org_path = './text_processing/api_org.txt'
    
    with open(api_key_path, 'r') as file: 
        api_key = file.read().strip()
    
    with open(api_org_path, 'r') as file:
        api_org = file.read().strip()

    # Create OpenAI client
    myclient = OpenAI(api_key=api_key, organization=api_org)

    # Generate the word
    prompt = ("I'm working on an educational tool to help people learn a new language. "
              "I will provide you with a sentence or a body of text, and I need you to identify "
              "some words. "
              "randomly select one word. No further explanations are required. You can ONLY output the word. "
              "Capitalize the first letter. Here's the text: \n") + text
              
    answer1 = myclient.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    chosen_word = answer1.choices[0].message.content

    # Generate the quiz options using the chosen word
    quiz_options = generate_quiz_options(chosen_word, api_key, api_org)

    print("DEBUG: Chosen word:", chosen_word)  # Debug print
    print("DEBUG: Quiz options:", quiz_options)  # Debug print
    return chosen_word, quiz_options
