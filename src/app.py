from flask import Flask, request, jsonify
import docxtpl

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        inputs = request.get_json()
        week_number = inputs.get('weekNumber', '')
        friday_text = inputs.get('fridayText', '')
        monday_text = inputs.get('mondayText', '')
        tuesday_text = inputs.get('tuesdayText', '')
        wednesday_text = inputs.get('wednesdayText', '')
        thursday_text = inputs.get('thursdayText', '')

        # Load the template
        doc = docxtpl.DocxTemplate("mal-ukeslogg.docx")

        # Insert the input text into the template
        context = {
          'weekNumber': week_number,
          'fridayText': friday_text,
          'mondayText': monday_text,
          'tuesdayText': tuesday_text,
          'wednesdayText': wednesday_text,
          'thursdayText': thursday_text
        }

        doc.render(context)

        # Save the new Word document
        file_name = "Ukeslogg uke {}.docx".format(week_number)
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
