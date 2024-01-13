import json
import os
from openai import OpenAI
from openai import correct_word

# These keys is needed to "login" and "authenticate"
# Read keys so they are not written in the code
filename = 'api_key.txt'
with open(filename, 'r') as file: 
    api_key = file.read().strip() #apikey
    
filename = 'api_org.txt'
with open(filename, 'r') as file:
    api_key2 = file.read().strip() #organization

# We will create a client object using the OpenAI api to make requests
# For this we need to use the keys so that is is authenticated and charges can be made
# This is the more recent APY - for 'OpenAI', not 'openai'

myclient = OpenAI(api_key = api_key, organization=api_key2)

#Generate the 4 options for the quiz
question2 = "I want to make a multiple choice quiz where the user is going to select the correct word.\
I am going to ask the user 'How do you say this word in Spanish?'\
Can you generate me the 4 options based on the word:" + correct_word + ". Only output the 4 options in Spanish please, no additional text. \
Display in json format and let the first letter always be capitalized. Let the keys be\
option1, option2, option3, option4"
options = myclient.chat.completions.create(
  model="gpt-4",
  messages=[
        {"role": "user", "content": question2}
    ]
)

options_content = options.choices[0].message.content
options_dict = json.loads(options_content)
#This is the json output
options_json = json.dumps(options_dict)