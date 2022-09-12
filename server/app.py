
from flask import Flask,jsonify
from flask_cors import CORS

#config
DEBUG=True

#instant the app
app = Flask(__name__)
app.config.from_object(__name__)

#enable CORs
CORS(app, resources={r'/*':{'origins':'*'}})

BOOKS = [
    {
        'title':'On the Verge','author':'whomever','read':False
    },{
        'title':'On the Lights','author':'Interpol','read':False
    },{
        'title':'Server side','author':'Dr.Sess','read':True
    },
    ]
#check route
@app.route('/')
def port_init():
    return '<h2>Hi there, testing server out</h2>'

@app.route('/ping',methods=['GET'])
def ping_me():
    return jsonify('Got data')

@app.route('/books',methods=['GET'])
def all_books():
    return jsonify({
        'status':'success',
        'books': BOOKS
    })

if __name__ == "__main__":
    app.run(port=3872)
