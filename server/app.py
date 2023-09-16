"""
https://johndanielraines.medium.com/python-for-less-terrible-secret-sharing-6b6e3ac55b9d

https://medium.com/@theprasadpatil/last-minute-revision-part-i-machine-learning-statistics-8de23a377987

check this https://www.digitalocean.com/community/tutorials/how-to-use-an-sqlite-database-in-a-flask-application
"""
import uuid
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
        'id':uuid.uuid4().hex,'title':'On the Verge','author':'Candice Dare','read':False
    },{
        'id':uuid.uuid4().hex,'title':'QED for people in a hurry','author':'Mia Melone','read':False
    },{
        'id':uuid.uuid4().hex,'title':'Server side and its applications','author':'Rose Monroe','read':True
    },
    ]

def remove_book(book_id):
    for book in BOOKS:
        if book['id'] == book_id:
            BOOKS.remove(book)
            return True
    return False

#check route
@app.route('/')
def port_init():
    return '<h2>Hi there, testing server out</h2>'
 
@app.route('/ping',methods=['GET'])
def ping_me():
    return jsonify('pong')

@app.route('/books',methods=['GET','POST'])
def all_books():
    response_obj = {'status':'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        BOOKS.append({
            'id': uuid.uuid4().hex,
            'title': post_data.get('title'),
            'author': post_data.get('author'),
            'read': post_data.get('read')
        })
        response_obj['message'] = 'Book added'
    else:
        response_obj['books'] = BOOKS
    return jsonify(response_obj)

@app.route('/books/<book_id>',methods=['PUT','DELETE'])
def single_book(book_id):
    response_obj = {'status':'success'}
    if request.method == 'PUT':
        post_data = request.get_json()
        remove_book(book_id)
        BOOKS.append({
            'id': uuid.uuid4().hex,
            'title': post_data.get('title'),
            'author': post_data.get('author'),
            'read': post_data.get('read')
        })
        response_obj['message'] = 'Book updated'

    if request.method == 'DELETE':
        remove_book(book_id)
        response_obj['message'] = 'Book removed'
    return jsonify(response_obj)

if __name__ == "__main__":
    app.run(port=3872)
