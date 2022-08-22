
from flask import Flask,jsonify
from flask_cors import CORS

#config
DEBUG=True

#instant the app
app = Flask(__name__)
app.config.from_object(__name__)

#enable CORs
CORS(app, resources={r'/*':{'origins':'*'}})

#check route
@app.route('/ping',methods=['GET'])
def ping_me():
    return jsonify('Got data')

if __name__ == "__main__":
    app.run(port=3872)
