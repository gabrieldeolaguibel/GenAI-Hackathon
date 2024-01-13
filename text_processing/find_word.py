import json
import os
from openai import OpenAI

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

# Getting the text from the frontend
filename = 'text.txt'
with open(filename, 'r') as file:
    text = file.read().strip() #chosen text

#Generate the word
prompt = "Hello, I'm working on an educational tool to help people learn a new language.\
I will provide you with a sentence or a body of text, and I need you to identify the most \
important words that a beginner should learn from it. For any piece of text given, please \
select one key word. No further explanations are required. You can ONLY output the word. \
Capitalize the first letter. Here's the text:" + text
answer1 = myclient.chat.completions.create(
  model="gpt-4",
  messages=[
        {"role": "user", "content": prompt}
    ]
)

correct_word = answer1.choices[0].message.content