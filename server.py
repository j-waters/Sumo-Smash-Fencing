import flask
from flask_socketio import SocketIO, join_room, leave_room, emit, rooms

from random import randint, choice
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
def disconnection():
    print("disconnect")

@socketio.on('controller')
def controller(data):
    join_room(str(data['data']))
    c = choice(['#ff0000', '#00ff00', '#0000ff'])
    emit('joinroom', {'colour': c})
    emit('newplayer', {'colour': c}, broadcast=True, room=get_room())

def get_room():
    for i in rooms():
        if len(i) < 10:
            return i

@socketio.on('start')
def desktop_join(data):
    room = randint(0, 10)
    join_room(str(room))
    emit('getcode', {'data': room})

@socketio.on('direction')
def direct(data):
    print(rooms())
    emit('direction', data, broadcast=True, room=get_room())

# send(username + ' has entered the room.', room=room)

if __name__ == "__main__":
    if True:
        host = '10.138.187.102'
    else:
        host = '127.0.0.1'
    socketio.run(app, host=host, debug=True)
