# Bracketeer
## Group T: Final Project
### Group Members: Jack Randle, Libby Madren, Nathan Turpin

## Frontend Routes

Pages    | Status | Contributor(s) | 
-------- | ------ | -------------- | 
Home     | ✅     | Libby          | 
Profile  | ✅     | Libby          |
Register | ✅     | Jack, Libby    | 
Login    | ✅     | Libby          |
Landing  | ✅     | Libby          |
Create Tournament  | ✅     | Nathan         | 
Edit Tournament    | ✅     | Nathan         | 
T. View  | ✅     | Jack, Nathan           |
Match View  | ✅     | Jack, Libby, Nathan           | 
Join     | ✅ | Jack | 
Confirm Join  | ✅     | Jack, Nathan          |
View Created Tournaments  | ✅     | Jack          |
View Entered Tournaments  | ✅     | Jack          |
Offline  | ✅     | Libby          |
Error  | ✅     | Libby          |

**15 pages / 15 pages = 100%**

## API Routes
All API routes from the previous milestone were updated to connect to the database instead of using mock data.

Method   | Route                                         | Description                                                     | Contributor(s)
-------- | --------------------------------------------- | --------------------------------------------------------------- | --------------
`GET`    | `/tournaments/:tournamentId`                  | Returns a tournament with a given tournament ID                 | Jack
`GET`    | `/tournaments`                                | Returns all tournaments                                         | Libby
`GET`    | `/tournaments/:tournamentId/matches`          | Return all of the matches associated with a specific tournament | Jack
`POST`   | `/tournaments`                                | Create a tournament                                             | Nathan
`POST`   | `/tournaments/:tournamentId/matches`          | Create matches for a specific tournament                        | Jack
`PUT`    | `/tournaments/:tournamentId/matches/register` | Updates matches for a specific tournament                       | Jack
`DELETE` | `/tournaments/:tournamentId`                  | Delete a specific tournament                                    | Nathan
`PUT`    | `/tournaments/:tournamentId`                  | Update a specific tournament                                    | Nathan
`GET`    | `/users/byId/:userId`                         | Return a specific user                                          | Nathan
`GET`    | `/users`                                      | Return all users                                                | Nathan
`GET`    | `/users/:userId/matches`                      | Returns all matches for a specific user                         | Libby
`GET`    | `/users/:userId/tournaments`                  | Returns all tournaments for a specific user                     | Libby
`GET`    | `/users/:userId/tournaments/entered`          | Returns all tournaments that a user has created                 | Jack
`GET`    | `/users/:userId/tournaments/created`          | Returns all tournaments that a user has created                 | Jack
`DELETE` | `/users/:userId`                              | Delete a specific user                                          | Libby
`GET`    | `/users/current`                              | Return the user currently logged in                             | Jack
`PUT`    | `/users/:userId`                              | Create/Update a specific user                                   | Libby
`GET`    | `/matches/:matchId`                           | Return a specific match                                         | Jack
`POST`   | `/join/:joinId`                               | Receives passcode or QR Code                                    | Jack
`GET`    | `/tournaments/join/:joinId`                   | Return specific tournament by join id                           | Nathan
`GET`    | `/tournaments/:tournamentId/participants`     | Return all participants of a specific tournament                | Nathan
`PUT`    | `/tournaments/join/:joinId`                   | Adds participant to a specific tournament                       | Nathan
`POST`   | `/login`                                      | Receives an email and password to log a registered user in      | Libby
`GET`    | `/login`                                      | Logs in a user                                                  | Jack
`GET`    | `/register`                                   | Registers a new user                                            | Jack
`GET`    | `/logout`                                     | Logs out the current user                                       | Jack


<h2> Working and Non-Working Features </h2>
xxx

<h2> Authentication/Authorization Process </h2>
<p>For authentication we are using JWT tokens and password hashing + salt using Argon2. The JWT token implementation is using the jsonwebtoken Node.JS libary. We have a jwt utility javascript file that facilitates generating, deleting, and verifiying jwt tokens. As a part of the jwt.js file we have a middleware function that is used within our protected routes. In terms of password storage, we are using Argon2 to hash passwords and we are generating a random salt value by using a sha256 hash of a random value. To integrate Argon2, we are using the node.js argon2 library: https://www.npmjs.com/package/argon2. Lastly, I would like to mention that our JWT tokens have a short expiry time of 5 min and are refreshed on every valid request. The users hashed passwords and salts are being stored in our database's user table. Authorization is being facilitated by our middleware, certain routes are protected and require a valid JWT, then that JWT's payload will provide the route/frontend page with necessary information to retrieve/dispaly data that the user should have access to.</p>

## ER Diagram
<img src="https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Milestone2/ER_Diagram.png"/>


## Individual Contributions

xxx
