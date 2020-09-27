# engage
### Description
Engage is a web application developed as part of the ShellHacks 2020 hackathon. It is a platform designed to engage students in their online learning by providing incentives to set study timers and achieve their goals. Try it out! https://engageshell.herokuapp.com/

### Installation & Setup
#### MongoDB
1. Navigate to MongoDB folder in Command Prompt or VSCode Terminal
	- ```cd C:\Program Files\MongoDB\Server\4.2\bin```
2. Run MongoDB
	- ```mongod.exe```
3. Access MongoDB via cmd
	- ```mongo```

#### Server
1. Navigate to engage directory 
2. Download dependencies
	- ```npm install```
3. Create .env file in base directory
	- Could just copy contents from .env.sample file
	- MONGO_ATLAS is required if connecting to MongoDB Atlas
4. Run Server
	- ```npx nodemon```
	- Should get "Server up and running on port 3030" and "MongoDB successfully connected"
5. CTRL-C to exit

#### Option 1: Frontend runs separately (for easier development)
1. Navigate to /frontend
	- ```cd frontend```
2. Download dependencies
	- ```npm install```
3. Run frontend
	- ```npm start```
4. Enter localhost:3000 on browser

#### Option 2: Backend hosts frontend (for deployment)
1. Navigate to /frontend
	- ```cd frontend```
2. Download dependencies
	- ```npm install```
2. Build
	- ```npm run build```
4. Enter localhost:3030 on browser (the server now hosts frontend build)

### References
https://react.semantic-ui.com/
https://codepen.io/daybrush/pen/EQPPBg
