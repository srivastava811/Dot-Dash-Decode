from flask import Flask, render_template, Response, jsonify
import cv2
import numpy as np
import dlib
from imutils import face_utils
from translation_module import convertMorseToText
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

# Initialize the webcam globally
cap = None  

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start', methods=['POST'])
def start_decoder():
    global cap
    if cap is None or not cap.isOpened():
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            return jsonify({"error": "Failed to open camera"}), 500
    return jsonify({"message": "Morse Code Decoder Started!"})

@app.route('/stop', methods=['POST'])
def stop_camera():
    global running, camera
    if running:
        running = False
        time.sleep(1)  # Allow the loop in generate_frames() to exit
        if camera is not None:
            camera.release()  # Release the webcam
            camera = None
        return jsonify({"message": "Decoder stopped."})
    else:
        return jsonify({"error": "Decoder is not running."})


# Load the face detector and shape predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(r"E:\Project1\Dot_Dash_Decode\computer_vision\models\shape_predictor_68_face_landmarks.dat")

# Define variables
counter = 0
pause = 0
debounce_counter = 0
morse_code = ""
current_word = ""
word_pause_frames = 25
EAR_threshold = 0.25
EAR_dot = 2
EAR_dash = 5
pause_frames = 20
pause_debounce = 3

# Function to calculate Euclidean distance
def distance(pa, pb):
    return np.linalg.norm(pa - pb)

# Function to calculate EAR (Eye Aspect Ratio)
def eye_aspect_ratio(a, b, c, d, e, f):
    horizontal_dist = distance(b, d) + distance(c, e)
    vertical_dist = distance(a, f)
    return horizontal_dist / (2.0 * vertical_dist)

# Video streaming function
def generate_frames():
    global morse_code, current_word, counter, pause, debounce_counter, cap

    if cap is None or not cap.isOpened():
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        for face in faces:
            landmarks = predictor(gray, face)
            landmarks = face_utils.shape_to_np(landmarks)

            left_blink = eye_aspect_ratio(landmarks[36], landmarks[37], landmarks[38], landmarks[41], landmarks[40], landmarks[39])
            right_blink = eye_aspect_ratio(landmarks[42], landmarks[43], landmarks[44], landmarks[47], landmarks[46], landmarks[45])
            ear = (left_blink + right_blink) / 2.0

            # Handle Morse Code Detection
            if ear < EAR_threshold:
                counter += 1
                pause = 0
                debounce_counter = 0
            else:
                if EAR_dot < counter < EAR_dash:
                    morse_code += "."
                elif counter > EAR_dash:
                    morse_code += "-"

                counter = 0
                pause += 1

                if pause >= pause_frames and debounce_counter == 0:
                    if morse_code:
                        char = convertMorseToText(morse_code)
                        current_word += char
                    morse_code = ""
                    debounce_counter = pause_debounce

                if pause >= word_pause_frames:
                    if current_word:
                        current_word += " "
                    pause = 0

            if debounce_counter > 0:
                debounce_counter -= 1

            cv2.putText(frame, f"EAR: {ear:.2f}", (100, 100), cv2.FONT_ITALIC, 1.2, (0, 0, 255), 2)
            cv2.putText(frame, f"Morse: {morse_code}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 0, 255), 2)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        socketio.emit('update', {'morse_code': morse_code, 'translated_text': current_word})
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
