from flask import Flask, request, jsonify
from flask_cors import CORS
from text_processing.find_word import get_chosen_word

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.json
    input_text = data.get('text')
    chosen_word = get_chosen_word(input_text)
    return jsonify({'selectedWord': chosen_word})

if __name__ == '__main__':
    app.run(debug=True)
