# Dev a single page app with Flask and Vue

This app is based on the following [tutorial](https://testdriven.io/blog/developing-a-single-page-app-with-flask-and-vuejs/).

List installed NPM packages:<br>
    $ npm list -g --depth=0

## Operation

### Server:
    $ python3.8 server/app.py

Serving at: http://localhost:3872/

*POST using curl*

    $ curl.exe -X POST http://localhost:3872/books -d '{"title": "adsdsaw", "author": "Big Assets", "read": "true"}' -H 'Content-Type: application/json'


### Client:
    $ cd client<br>
    $ npm install<br>
    $ npm run serve

Head to: http://localhost:8080

## Running Environment
- OS : Windows 11 Pro
- Vue: 
    * cli-service-global v4.5.17
    * cli v5.0.8
- axios: v0.26.1
- bootstrap v5.1.3
- Node: v16.14.2
- npm: v8.5.0
- Python: v3.10
- Flask: v2.1.1
- Flask CORS: v3.0.10
