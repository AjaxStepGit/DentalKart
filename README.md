# DentalKart
This is Dental kart project
HEllo Sir, 

Frontend Used - React JS

LOGIN SCREEN
![Login](https://user-images.githubusercontent.com/127086004/224508489-022d694a-d971-44ed-a52a-011307b19a11.JPG)

Sign Up
![sign up](https://user-images.githubusercontent.com/127086004/224508497-b6230f28-9fd0-4ed9-9660-c7cd81f917bc.JPG)

Working video
https://user-images.githubusercontent.com/127086004/224508577-e2e59f9e-4e1d-4915-92bb-8e4aea5272c9.mp4




Backend Used - MySQL, EXPRESS JS

There are two tables - 

1. Registration Table
![Registration table](https://user-images.githubusercontent.com/127086004/224508626-531f5042-593e-4863-bfc4-e55ec527b575.JPG)

2. Student CSV table
![db photo](https://user-images.githubusercontent.com/127086004/224508646-d8f5383a-e53f-4455-8d18-4dd93d3a6d6a.JPG)
![table cv](https://user-images.githubusercontent.com/127086004/224508683-a7209293-f7fc-4410-b9c6-fdab2a6a003e.JPG)


TOKEN GENERATION 
![jwt token creation](https://user-images.githubusercontent.com/127086004/224508673-a37a194a-e433-4aa4-a70d-7824d2fe4c33.JPG)


----INSTRUCTION___

1. Setup a react project and install all the modules through npm i
2. Setup a express project and install all the modules through npm i
3. All the backend service are defaulty run on port 5000 and also default db name is ajaxdb
4. All the frontend runs on port 3000

BACKEDN API - 
1. /getall  - list all student - GET
2. /api/users/ - create user - POST - 
    E.g.  PARAMS {
            "first_name":"Ajay",
            "last_name":"Pathak",
            "password":"123456hj",
            "email":"test1@gm.com"
          }
3. /api/users/login - login - POST
     E.g.  PARAMS {
            "password":"123456hj",
            "email":"test1@gm.com"
   }

4. /submit-form -> for uploading a csv file
5. /download -> for downloading csv file
