from flask import Flask, request, jsonify
import docxtpl

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        input_text = request.get_json()['inputText']

        # Load the template
        doc = docxtpl.DocxTemplate("ukeslogg.docx")

        # Insert the input text into the template
        context = {'inputText': input_text}
        doc.render(context)

        # Save the new Word document
        file_name = "generated-document.docx"
        doc.save(file_name)

        # Return the file name to the frontend
        response = jsonify({'fileName': file_name})
        return response

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    app.run(debug=True)
