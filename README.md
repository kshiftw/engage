# engage

### Commands & Setup
Main directory: Run Server
- npm install 
	->downloads dependencies on local machine
- npx nodemon
	-> run server, should get "Server running on port 3000"
- CTRL-C to exit

/frontend: Run frontend
- cd frontend
- npm start
- enter localhost:3000 on browser

create .env file
- same content as .env.sample file

Need to make sure MongoDB is running
- cd C:\Program Files\MongoDB\Server\4.2\bin
- mongod.exe 
	-> starts MongoDB
- mongo
	-> cmd line access to MongoDB database
