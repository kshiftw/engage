# engage
### Description


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

#### Frontend
1. Navigate to /frontend
	- ```cd frontend```
2. Download dependencies
	- ```npm install```
3. Run frontend
	- ```npm start```
4. Enter localhost:3000 on browser

### References
https://react.semantic-ui.com/
