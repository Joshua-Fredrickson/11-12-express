# LAB 11-12 EXPRESS

**Author**: Joshua Fredrickson

**Version**: 1.0.0 

## Overview
Lab 11-12 is a Shoe intake management application that takes api requests and posts the data into a 
Mongo Data Base.


## Getting Started
After installing the Lab 11-12 files, install node.js and the following dependencies: 
body-parser, dotenv, express, faker, mongoose, winston

## Architecture
Node.js, body-parser, dotenv, express, faker, mongoose, winston
    
SERVER ENDPOINTS 

POST /api/shoes
- pass data as stringifed JSON in the body of a POST request to create a new resource
- on success respond with a 200 status code and the created note
- on failure due to a bad request send a 400 status code

GET /api/shoes and GET /api/shoes/:id
- with no id in the query string it should respond with an array of all of your resources
- with an id in the query string it should respond with the details of a specifc resource (as JSON)
- if the id is not found respond with a 404

DELETE /api/shoes/:id
- the route should delete a note with the given id
- on success this should return a 204 status code with no content in the body
- on failure due to lack of id in the query respond with a 400 status code
- on failure due to a resouce with that id not existing respond with a 404 status code

## Change Log 
04-30-2018 4:59pm - Scaffolding was completed
04-30-2018 8:00pm - Lab was functional and passing Test 
04-30-2018 4:59pm - Delete functionality was added.

## Credits and Collaborations
Specail thanks to all of the Code Fellows staff and fellow 401-d23 students