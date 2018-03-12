import flask
from flask_socketio import SocketIO, join_room, leave_room, emit

from random import randint
from json import dumps

app = flask.Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)



@app.route('/') # HTTP Request for the root page
def game():
    return flask.send_file('build/index.html')


@app.route('/game.js') # HTTPS Request for the JavaScript for the game
def dep1():
    return flask.send_file('build/game.js')


@app.route('/vendor.js') # HTTP Request for Misc. JavaScript
def dep2():
    return flask.send_file('build/vendor.js')

# Uses Websocket Protocol
@socketio.on('connect') # When it receives a connect message, it runs the function
def connection():
    pass

@socketio.on('disconnect') # When it receives a disconnect message, it runs the function
def connection():
    print("disconnect")

@socketio.on('controller')
def connection(data):
    join_room(data['data'])
    emit('joinroom', {'colour': '#ff0000'}, room=flask.request.sid)

@socketio.on('start')
def desktop_join(data):
    room = randint(0, 99999)
    join_room(room)
    emit('getcode', {'data': room})


# send(username + ' has entered the room.', room=room)


if __name__ == "__main__":
    socketio.run(app, debug=True)
