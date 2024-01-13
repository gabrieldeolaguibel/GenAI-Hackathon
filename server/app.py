# app.py
from flask import Flask, request, jsonify
from text_processing.find_word import get_chosen_word_and_quiz
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.json
    input_text = data.get('text')

    chosen_word, quiz_options = get_chosen_word_and_quiz(input_text)
    
    return jsonify({'chosenWord': chosen_word, 'quizOptions': quiz_options})

if __name__ == '__main__':
    app.run(debug=True)
