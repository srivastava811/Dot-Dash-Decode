# Dot-Dash-Decode
A MORSE code decoding project that takes eye blink as input and gives English text as output

###  Motivation behind the project
Communication is an important aspect for human beings. However, the individuals with severe motor disabilities often face significant challenges in expressing themselves. Traditional assistive technologies, such as speech-to-text software or physical keyboard, may not be always a viable solution for individuals with limited or no muscle control.

Also, during a television interview in 1966, Jeremiah Denton, a U.S. Navy Commander and POW in North Vietnam, blinked the word "T-O-R-T-U-R-E" in Morse code to alert the U.S. military to the mistreatment of American prisoners of war. 
#### 🎥 Click the thumbnail below to watch how the idea was born!  

[![Watch the video](https://img.youtube.com/vi/muzAhCLzpic/maxresdefault.jpg)](https://youtu.be/muzAhCLzpic)

## ✨ Features  
- **Real-time eye blink detection** using Computer Vision  
- **Morse Code translation** into readable text  
- **Hands-free communication** for users with limited mobility  
- **User-friendly UI** with simple controls


## 🛠️ Technical Aspect

### Technologies Used

##### Main Dependencies
- VSCode IDE
- Git
- GitHub
  
##### Frontend Dependencies
- Node.js (Version 22.14.0)
- React.js
- ######Dependencies:
- Axios

##### Backend Dependencies
- Cmake (Version 3.31.3) Cmake is a cross-platform open source build system.
- Microsoft Visual Studio Installer (Microsoft Visual C++ 2015-20122 Redistributable (x86))
- Visual Studio Build Tools (Version 17.12.3)
- Python (3.13.1)
- ######Dependencies:
- Flask, Flask-SocketIO, Flask-SQLAlchemy, Flask-JWTManager, Flask-Bcrypt, CORS
- Computer Vision: OpenCV, dlib library, imutils
- Authentication: JWT (JSON Web Tokens), Bcrypt
- Database: SQLite
- Email: Flask-Mail
  
#### Working of the modules
The project consists of several key files:
### Final.py: 
Main application entry point, handles video processing and Morse     
Code detection
### auth_routes.py: 
Handles Authentication-related routes (login, register, verification)
### db_setup.py: 
Database models and configuration.
### translation_module.py: 
Morse code to text translation logic

### Component Interaction
- Flask backend captures video from the webcam, processes frames to detect eye blink
- Eye blinks are converted to dots and dashes based on duration
- Morse Code is translated to text using the translation module
- Real-time updates are sent to the frontend using WebSockets (Flask-SocketIO)
- User authentication is handled via JWT tokens

### Installation and Setup

##### Prerequisites
- Python (3.7+)
- pip (Python package manager)
- Camera/Webcam
- dlib facial landmark predictor model

##### Steps
1. Clone the repository
   git clone https://github.com/Projects-BV/Dot_Dash_Decode.git
   cd dot-dash-decode

2. Install required Softwares
   Install Cmake, Visual Studio Build Tools and Node.js

3. Install required packages
   pip install -r requirements.txt

4. Download the dlib facial landmark predictor
   Download shape_predictor_68_face_landmarks.dat from (http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2)
   Extract and place it in the computer_vision/models/ directory
   Update the path as per requirement

5. Configure environment variables
   export JWT_SECRET_KEY="your_secret_key"
   export MAIL_USERNAME="your_email@gmail.com"
   export MAIL_PASSWORD="your_app_password"
   export FRONTEND_URL="http://localhost:3000"

6. Initialize the database
   flask db init

7. Run the application
   python final.py

### Working 
#### Morse Code Detection
1. The application captures video frames from the camera
2. Facial landmarks are detected using dlib
3. The Eye Aspect Ratio(EAR) is calculated to determine if eyes are opened or closed
<pre>```def eye_aspect_ratio(a, b, c, d, e, f):
    horizontal_dist = distance(b, d) + distance(c, e)
    vertical_dist = distance(a, f)
    ear = horizontal_dist / (2.0 * vertical_dist)
    return ear```</pre>
4. Short blinks (<threshold) are interpreted as "dots"(.)
5. Longer blinks are interpreted as "dashes"(-)
6. Longer pause denote the end of a word
  <pre>``` 
  # Handling Morse code generation based on blink duration
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
     debounce_counter -= 1```</pre>

#### Authentication System
1. Users register with email, username, and password
2. Email verification is required before login
3. JWT tokens are used for authentication API access
4. Password hashing is done using Bcrypt

#### API Endpoints
##### Authentication
- POST/auth/register - Register new user
- POST/auth/login - Login with credentials
- GET/auth/verify/<token> - Verify email with token
- POST/auth/resend-verification - Resend verification email
- GET/auth/profile - Get user profile(protected route). Requires valid JWT token

##### Morse Code Decoder
- POST/start - Start the Morse Code Decoder (requires authentication)
- POST/stop - Stop the decoder
- POST/reset - Reset the current Morse code and translated text
- GET/video-feed - Stream the processed webcam feed

#### Configuration
##### Email Configuration
- MAIL_USERNAME : Gmail Address
- MAIL_PASSWORD : An app password from Google
- MAIL_DEFAULT_SENDER : Email adderess for sending emails

##### JWT Configuration
- JWT_SECRET_KEY : Secret key for signing JWT tokens

##### Database Configuration
- SQLite database is used by default
- Configuration can be modified in app.py

#### Usage Guide
1. Register an account through the frontend
2. Verify your email by clicking the link sent to your inbox
3. Login to get access to the Morse code Decoder
4. Click "Start Decoder" to begin capturing video
5. Blink your eyes to create Morse code patterns:
  - Short blink = dot (.)
  - Long blink = dash (-)
  - Pause = end of character
  - Long Pause = end of word
6. The application translates the Morse code to text in real-time
7. Click "Reset" to clear the current message
8. Click "Stop" to end the session






