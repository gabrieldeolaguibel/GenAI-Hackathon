from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.json
    # Process the data and return a response
    # For now, just echo the received data
    response = {'selectedWord': 'example_word'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
