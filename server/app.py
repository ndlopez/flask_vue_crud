
from urllib import request
from flask import Flask,jsonify, request
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

@app.route('/books',methods=['GET','POST'])
def all_books():
    response_obj = {'status':'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        BOOKS.append({
            'title': post_data.get('title'),
            'author': post_data.get('author'),
            'read': post_data.get('read')
        })
        response_obj['message'] = 'Book added'
    else:
        response_obj['books'] = BOOKS
    return jsonify(
        response_obj
    )

if __name__ == "__main__":
    app.run(port=3872)
