## Guide to start a blank NodeJs + ExpressJs + MongoDB project

### a. Creating NodeJs project
1. Install NodeJs on your system.
2. Create a new directory for your poject example `test_project`.
3. Open terminal inside that directory.
4. Run command `npm init`, it will ask you some prompts you can enter or change the configurations in prompts.
5. After the above prompt completes it will create a file called `package.json` in the project directory.
6. Create a javascript file in the root directory which will be your starting or main project file, like `index.js`.
7. In the `package.json` file add start script like this `"start": "nodemon index.js"`
8. Install the nodemon package by running `npm install nodemon` in the project directory.

### b. Installing ExpressJs
1. Open terminal in project directoy and install express package by running this command `npm install express`
2. Create your simple http server in ExpressJs and start the project.
3. Create below folders make your project more structured.
   1. `/controllers`
   2. `/routes`
   3. `/middlewares`
   4. `/config`

### c. Create a MongoDb Cluster on Atlas
1. Go to MongoDB website https://www.mongodb.com/
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-1.png?raw=true" alt="step 1">
<br />
2. Signup if new login if already have an account
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-2.png?raw=true" alt="step 2">
<br />
3. Accept terms and continue
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-3.png?raw=true" alt="step 3">
<br />
4. Fill this survey form and submit
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-4.png?raw=true" alt="step 4">
<br />
5. Here select free plan M0
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-5.png?raw=true" alt="step 5">
<br />
6. Select aws as provide, select mumbai region and give your cluster a name and create it, it will take 10 to 15 minutes in creating a cluster.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-6.png?raw=true" alt="step 6">
<br />
7. On sidemenu of dashboard click on Database option.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-7.png?raw=true" alt="step 7">
<br />
8. On this page you will see the cluster you had created, click on browse collections.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-8.png?raw=true" alt="step 8">
<br />
9. It will show you your all database if not click on Add My Own Data to create database.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-9.png?raw=true" alt="step 9">
<br />
10. On this modal create your database by giving it a name and also provide it a collection name which will be inside it and then click create button.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-10.png?raw=true" alt="step 10">
<br />
11. You can see here the database you had created.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-11.png?raw=true" alt="step 11">
<br />
12. On sidemenu click on database access option, this page will show you all the users you had created if not add a new user.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-12.png?raw=true" alt="step 12">
<br />
13. In the create user modal select password as authentication method, enter userid and password.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-13.png?raw=true" alt="step 13">
<br />
14. In roles select read and write to any database and create the user.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-14.png?raw=true" alt="step 14">
<br />
15. Again in sidemnu click on database and on cluster click connect button and on the below modal select allow from anywhere option.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-15.png?raw=true" alt="step 15">
<br />
16. On below sreen select drivers option.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-16.png?raw=true" alt="step 16">
<br />
17. From here copy the MongoURI of your cluster and save it somewhere.
<img src="https://github.com/mohsinogen/BackendDevelopmentHAB2/blob/main/media/step-17.png?raw=true" alt="step 17">
<br />


### d. Installing mongoose and connecting with our MongoDB Atlas cluster
1. Open terminal in project directoy and install mongoose package by running this command `npm install mongoose`
2. Add your MongoUri copied from MongoDb Atlas in `.env` file, and add blow code 
```
DATABASE_USER=<Your MongoDb database user>
DATABASE_PASSWORD=<Your MongoDb database user's password>
DATABASE_NAME=<Your MongoDb database name>
```
3. In the config folder of your project create `db.js` file and create a function to connect MongoDB like below
   ```javascript
   import mongoose from "mongoose";
   const connectDB = async () => {
    try {
      const conn = await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@mohsinogen.smovl.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    );
      console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline);
    } catch (error) {
      console.error(`Error: ${error}`.red.underline);
      process.exit(1);
    }
   };

   export default connectDB;
   ```
4. Call this `connectDB` function inside your index.js file and you will be connected with your database.
5. Create `/models` folder to store your MongoDB mongoose models and schema.
