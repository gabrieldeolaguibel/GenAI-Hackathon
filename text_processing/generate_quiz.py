# generate_quiz.py
import json
from openai import OpenAI

def generate_quiz_options(chosen_word, api_key, api_org):
    # Create OpenAI client
    myclient = OpenAI(api_key=api_key, organization=api_org)

    # Generate the quiz options
    question = ("I want to make a multiple choice quiz where the user is going to select the correct word.\
I am going to ask the user 'How do you say this word in Spanish?'\
Can you generate me the 4 options based on the word:" + chosen_word + ". Only output the 4 options in Spanish please and a 5th json element with the correcrt answer. no additional text. \
Display in json format and let the first letter always be capitalized. Let the keys be\
option1, option2, option3, option4, coreect. Be sure that the correct answer is always one of the 4 options (chosen word translated in Spanish). No answers text should have accent/special characters.\n")

    options = myclient.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": question}]
    )

    options_content = options.choices[0].message.content
    print("DEBUG: Raw API Response:", options_content)  # Debug print

    try:
        options_dict = json.loads(options_content)
        return json.dumps(options_dict)
    except json.JSONDecodeError as e:
        print("JSON decoding error:", e)
        # Handle the error, return an error message or default value
        return json.dumps({"error": "Invalid response format"})