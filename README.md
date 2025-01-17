# City_Utility
Microservice based City_Utility Project hosted on localhost using Docker.

This project is a **multi-service web application** that includes both frontend and backend components. It leverages **microservices architecture** to manage different functionalities like user management, location tracking, announcement posting, email notifications, and utility reporting.

## Project Structure

```plaintext
├── LICENSE
├── README.md
├── admin/
├── email-service/
├── frontend/
├── location-service/
├── public-info-service/
├── user-service/
├── utility-reporting-service/


Folder and File Overview
Here's a breakdown of the main directories and their purposes:

## 1. frontend/

This directory contains the React frontend for the application.

For Citizen:

Registration Screen : Name Email Password.
                      Email verification is required through otp.

Login : Registered Email and password.

Home    : Where User Get Three Option
        - Report an Issue   -> to report a utility issue.
        - Go to Report Form -> to View reported issues and track their status.
        - Announcements     -> to Check out the latest announcements.

    All three are different web pages and user with citizen role can access them.

For Admin:
Admin Home : Where Admin Get Three Option
            - Add Employee  -> Where New Employee can be added and can be deleted.
            - Admin Panel   -> Where admin can see all reports and assign them to employee.
            - Announcements -> To create edit or delete announcements.
            - Archived Reports -> Reports of which solution has been provided and been moved to Archived.
    
    All three are different web pages and user with admin role can access them.

For Employee:
Employee Page : 
            - Employee see Reports assign to them and can change status.

View Announcements - Announcements can be seen by anyone with or without login.

There is Option to update Profile for all users where they can Change name , email and password.
Only Citizen will be able to delete their account.

Dockerfile - Configuration for building the frontend Docker image.

```bash
To run on localhost using Docker
docker build -t frontend .
docker run -d -p 3000:3000 --name frontend frontend

```bash
.env - Requires
    REACT_APP_API_URL=http://localhost:5000/api/users



## 2. user-service/

Responsible for user management, including registration, login, and updation of user data.

Three roles of user are supported.

Citizen : which can be Registered through registration page.
Employee: Which can be added by Admin only.
Admin   : admin folder contains addUser.js file, using which admin can be added.

Password will be saved in encrypted form. addAdmin.js for adding admin also have encryption of password for consistency across application.


```bash
.env - Requires
    MONGO_URI="Your mongo db connector api"
    JWT_SECRET="your_jwt_secret"

```bash
Dockerfile - Container configuration.
To run on localhost using Docker
docker build -t user-service .
docker run -d -p 5000:5000 --name user-service user-service




## 3. admin/
Contains scripts and configurations to Add Admin User.Run Node addAdmin.js,which will create admin user given in addAdmin.js.

It doesn't need to run on any localhost.

```bash
.env - Requires 
    MONGODB_URI="Your mongo db connector api"
    JWT_SECRET="your_jwt_secret"




## 4. email-service/
It's a microservice that use MAILJET for email communication. It's Expects data and to (email address) to send mail.
This microservice has been used in ReportForm , Admin Dashboard , Employ Dashboard.

In ReportForm , when user files a Report , user gets email confirmation.
In Admin Dashboard , when admin assign report to employee , employee gets email that report has been assigned to them.
In Employee Dashboard , when employee updates the report status, user gets the email notification that the report is in progress or solution has been provided. 

```bash
.env - Requires
    PORT=5005
    MAILJET_API_KEY=
    MAILJET_API_SECRET=

```bash
Dockerfile - Docker configuration for containerizing the service.
To run on localhost using Docker
docker build -t email-service .
docker run -d -p 5005:5005 --name email-service-container email-service




## 5. location-service/

This is a microservice where we use browser based Geolocation API which sends coordinates and using those coordinated use find exact address of user using OPENCAGE_API_KEY.

```bash
Dockerfile - Container configuration.
To run on localhost using Docker
docker build -t location-service .
docker run -d -p 5002:5002 --name location-service location-service

```bash
.env - Requires
    OPENCAGE_API_KEY="your opencage api key"





## 6. public-info-service/
Manages public announcements and admin can perform CURD operation while citizens and employee can only read.

```bash
.env - Requires
    MONGO_URI="Your mongo db connector api"
    JWT_SECRET="your_jwt_secret"
    PORT=5004

```bash
Dockerfile - Container configuration.
To run on localhost using Docker
docker build -t public-info-service .
docker run -d -p 5004:5004 --name public-info-service-container public-info-service




## 7. utility-reporting-service/
Manages reporting utilities within the application, user can create reports regarding water electricity or waste management.

user uses location service to provide address of the site of the report which can be useful for employee/administration during solving of problem.

user can create and delete the report.

```bash
.env - Requires
    MONGO_URI="Your mongo db connector api"
    JWT_SECRET="your_jwt_secret"

```bash
Dockerfile - Container configuration.
To run on localhost using Docker
docker build -t utility-reporting-service .
docker run -d -p 5001:5001 --name utility-reporting-service utility-reporting-service


## 7. history-service/

Admin can archive the resolved/completed reports, on archiving reports will be deleted from utility-reporting-service and will be shifted to history-service database with important but limited information.

```bash
.env - Requires
    MONGO_URI="Your mongo db connector api"
    JWT_SECRET="your_jwt_secret"

```bash
Dockerfile - Container configuration.
To run on localhost using Docker
docker build -t history-service .
docker run -d -p 5006:5006 --name history-service-container history-service


##Installation
Clone the Repository:

```bash
git clone <repo-url>
cd <repo-directory>



Environment Configuration:

Service has an .env file to configure service-specific environment variables.

Install Dependencies:
Navigate to each service directory (e.g., email-service, user-service, frontend) and install dependencies:
```bash
npm install


Run the Services:

You can run each service separately by navigating into the service folder and running:

Each service includes a Dockerfile that can be built and run using Docker Compose.
Start the container in docker (command given above for each microservice)

type on browser

```bash
http://localhost:3000/ 



Enjoy!
