# Bracketeer
## Group T: Milestone 2
### Group Members: Jack Randle, Libby Madren, Nathan Turpin

## Frontend Routes

Pages    | Status | Contributor(s) | Wireframe
-------- | ------ | -------------- | ---------
Home     | ✅     | Libby          | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-groupT-Wireframe-Landing.png)
Profile  | ✅     | Libby          |
Register | ✅     | Jack, Libby    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342%20-%20Wireframes-register.png)
Login    | ✅     | Libby          |
Landing  | ✅     | Libby          |
Create   | ✅     | Nathan         | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-createjoin.png)
Edit     | ✅     | Nathan         | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-edittournament.png)
T. View  | ✅     | Jack           |
Matches  | 0%     | N/A            | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-bracketviewedit.png)
M. View  | ✅     | Jack           | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-bracketviewedit.png)
Join     | 50% (currently part of T. View) | N/A | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-createjoin.png)

**9.5 pages / 11 pages = 86%**

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
`DELETE` | `/users/:userId`                              | Delete a specific user                                          | Libby
`DELETE` | `/users/current`                              | Return the user currently logged in                             | Jack
`PUT`    | `/users/:userId`                              | Create/Update a specific user                                   | Libby
`POST`   | `/login`                                      | Receives an email and password to log a registered user in      | Libby
`POST`   | `/join/:joinId`                               | Receives passcode or QR Code                                    | Jack
`GET`    | `/matches/:matchId`                           | Return a specific match                                         | Jack
`GET`    | `/login`                                      | Logs in a user                                                  | Jack
`GET`    | `/register`                                   | Registers a new user                                            | Jack
`GET`    | `/logout`                                     | Logs out the current user                                       | Jack


<h2> What is Done </h2>
<p>Authentication and authorization are fully implemented. We have also fully designed and implemented our database model with the required DAOs and model classes.</p>
<p>xxx</p>

<h2> What is Not Done </h2>
<p>xxx</p>

Some things you could include based on what I've seen --Nathan
* Need solution for storing user-chosen banner images. Currently auto-generated
* Need a getUserByUsername API function to retrieve organizerId when creating tournaments
* Not yet a way to add matches or participants to tournament via frontend, but possible through database
* Match View route still uses mock data, but it is the only route that still uses mock data (I'm pretty sure). Should be compliant with 90% dynamic data requirement

tl;dr joining tournaments and most functionality relating to matches

<h2> Authentication/Authorization Process </h2>
<p>For authentication we are using JWT tokens and password hashing + salt using Argon2. The JWT token implementation is using the jsonwebtoken Node.JS libary. We have a jwt utility javascript file that facilitates generating, deleting, and verifiying jwt tokens. As a part of the jwt.js file we have a middleware function that is used within our protected routes. In terms of password storage, we are using Argon2 to hash passwords and we are generating a random salt value by using a sha256 hash of a random value. To integrate Argon2, we are using the node.js argon2 library: https://www.npmjs.com/package/argon2. Lastly, I would like to mention that our JWT tokens have a short expiry time of 5 min and are refreshed on every valid request. The users hashed passwords and salts are being stored in our database's user table. Authorization is being facilitated by our middleware, certain routes are protected and require a valid JWT, then that JWT's payload will provide the route/frontend page with necessary information to retrieve/dispaly data that the user should have access to.</p>

## ER Diagram
[diagram](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Milestone2/ER_Diagram.png)
<img src="https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Milestone2/ER_Diagram.png"/>

## Individual Contributions
** Link file here when it's finished? **
___

<table>
  <tr>
    <th colspan=6 >Preliminary</th>
  </tr>
  <tr>
    <th>Task Name</th>
    <th>Description</th>
    <th>Owner</th>
    <th>Contributor</th>
    <th>Due Date</th>
    <th>Completion Date</th>
  </tr>
  <tr>
    <td>Create Task Plan</td>
    <td>Create a Google Sheets that maps out all tasks that need to be done and in what order those tasks need to be completed</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/1/22</td>
    <td>11/1/22</td>
  </tr>
  <tr>
    <td>Set up Milestone 2 Repo</td>
    <td>Add the required files to the Milestone 2 directory in team repository</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/1/22</td>
    <td>11/1/22</td>
  </tr>
  <tr>
    <td>Assign Task Owners</td>
    <td>Work with team to assign tasks and add/remove any tasks</td>
    <td>Team</td>
    <td>Team</td>
    <td>11/1/22</td>
    <td>11/1/22</td>
  </tr> 
</table>

<table>
  <tr>
    <th colspan=6 >Step One: Create the Database</th>
  </tr>
  <tr>
    <th>Task Name</th>
    <th>Description</th>
    <th>Owner</th>
    <th>Contributor</th>
    <th>Due Date</th>
    <th>Completion Date</th>
  </tr>
  <tr>
    <td>Modify docker-compose.yml</td>
    <td>Modify the docker-compose.yml file to create a container for the MariaDB database</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/1/22</td>
    <td>11/1/22</td>
  </tr>
  <tr>
    <td>Design Database Schema</td>
    <td>Create an entity relation diagram that reflects our team's database schema design.</td>
    <td>Team</td>
    <td>Team</td>
    <td>11/1/22</td>
    <td>11/1/22</td>
  </tr> 
  <tr>
    <td>Create tournament Table</td>
    <td>write the SQL to create tournament table</td>
    <td>Nathan</td>
    <td>Nathan</td>
    <td>11/1/22</td>
    <td>11/1/22</td>
  </tr> 
  <tr>
    <td>Create match table</td>
    <td>write the SQL to create matches table</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/1/22</td>
    <td>11/1/22</td>
  </tr> 
  <tr>
    <td>Create user Table</td>
    <td>write the SQL to create user table</td>
    <td>Libby</td>
    <td>Libby</td>
    <td>11/1/22</td>
    <td>11/1/22</td>
  </tr> 
</table>

<table>
  <tr>
    <th colspan=6 >Step Two: Integrate API with Database</th>
  </tr>
  <tr>
    <th>Task Name</th>
    <th>Description</th>
    <th>Owner</th>
    <th>Contributor</th>
    <th>Due Date</th>
    <th>Completion Date</th>
  </tr>
  <tr>
    <td>Integrate users endpoints with database</td>
    <td>Integrate the users API endpoints with the database so that they are interfacing with the database instead of mock data. Implement any necessary DAOs</td>
    <td>Libby</td>
    <td>Libby</td>
    <td>11/2/22</td>
    <td>11/2/22</td>
  </tr>
  <tr>
    <td>Integrate tournaments endpoints with database</td>
    <td>Integrate the tournaments API endpoints with the database so that they are interfacing with the database instead of mock data. Implement any necessary DAOs</td>
    <td>Nathan</td>
    <td>Nathan</td>
    <td>11/3/22</td>
    <td>11/3/22</td>
  </tr> 
  <tr>
    <td>Integrate match endpoint with database</td>
    <td>Integrate the match API endpoint with the database so that they are interfacing with the database instead of mock data. Implement any necessary DAOs</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/2/22</td>
    <td>11/2/22</td>
  </tr> 
</table>

<table>
  <tr>
    <th colspan=6 >Step Three A: Implement Authentication</th>
  </tr>
  <tr>
    <th>Task Name</th>
    <th>Description</th>
    <th>Owner</th>
    <th>Contributor</th>
    <th>Due Date</th>
    <th>Completion Date</th>
  </tr> 
  <tr>
    <td>Create Register Page</td>
    <td>Create register page that allows for a user to register with a username and password</td>
    <td>Jack</td>
    <td>Jack <br/> Libby</td>
    <td>11/3/22</td>
    <td>11/3/22</td>
  </tr>  
  <tr>
    <td>Create Register Endpoint</td>
    <td>Create a register endpoint that creates a user, generates a salt, hashes the password, and stores the user's info in the database</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/3/22</td>
    <td>11/3/22</td>
  </tr>  
  <tr>
    <td>Integrate /login endpoint with database</td>
    <td>Integrate the /login API endpoint with the database so that it is interfacing with the database instead of mock data</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/3/22</td>
    <td>11/3/22</td>
  </tr>  
  <tr>
    <td>Create current user endpoint</td>
    <td>Add endpoint that returns the currently authenticated user</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/3/22</td>
    <td>11/3/22</td>
  </tr>  
  <tr>
    <td>Log in endpoint</td>
    <td>Add ability for user to log in with account credentials</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/3/22</td>
    <td>11/3/22</td>
  </tr>  
  <tr>
    <td>Log out endpoint</td>
    <td>Add ability for user to log out</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/3/22</td>
    <td>11/3/22</td>
  </tr>  
  <tr>
    <td>Access Control</td>
    <td>Users should only be able to see data that they are allowed to see</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/3/22</td>
    <td>11/3/22</td>
  </tr>  
</table>

<table>
  <tr>
    <th colspan=6 >Step Three B: Implement Dynamic Frontend</th>
  </tr>
  <tr>
    <th>Task Name</th>
    <th>Description</th>
    <th>Owner</th>
    <th>Contributor</th>
    <th>Due Date</th>
    <th>Completion Date</th>
  </tr>
  <tr>
    <td>Implement Dynamic Content for Login Page</td>
    <td>Create login page and connect it to the api endpoint that intefaces with the database</td>
    <td>Libby</td>
    <td>Libby</td>
    <td>11/5/22</td>
    <td>11/5/22</td>
  </tr>  
  <tr>
    <td>Implement Dynamic Content for Home Page</td>
    <td>Remove mock data from the home page and use API endpoint to serve dynamic data instead</td>
    <td>Libby</td>
    <td>Libby</td>
    <td>11/5/22</td>
    <td>11/5/22</td>
  </tr> 
  <tr>
    <td>Implement Dynamic Content for Profile Page</td>
    <td>Remove mock data from the profile page and use API endpoint to serve dynamic data instead</td>
    <td>Libby</td>
    <td>Libby</td>
    <td>11/5/22</td>
    <td>11/5/22</td>
  </tr> 
  <tr>
    <td>Implyment Dynamic Content for Tournament Create Page</td>
    <td>Connect the form on create tournament page to the api endpoint that interfaces with the database</td>
    <td>Nathan</td>
    <td>Nathan</td>
    <td>11/5/22</td>
    <td>11/5/22</td>
  </tr> 
  <tr>
    <td>Implement Dynamic Content for Tournament Edit Page</td>
    <td>Connect the form on edit tournament page to the api endpoint that interfaces with the database</td>
    <td>Nathan</td>
    <td>Nathan</td>
    <td>11/5/22</td>
    <td>11/5/22</td>
  </tr> 
</table>

<table>
  <tr>
    <th colspan=6 >Step Three B: Implement Dynamic Frontend</th>
  </tr>
  <tr>
    <th>Task Name</th>
    <th>Description</th>
    <th>Owner</th>
    <th>Contributor</th>
    <th>Due Date</th>
    <th>Completion Date</th>
  </tr>
  <tr>
    <td>Write "What is done" section of readme</td>
    <td></td>
    <td></td>
    <td></td>
    <td>11/6/22</td>
    <td></td>
  </tr>
  <tr>
    <td>Write "What is not done" section of readme</td>
    <td></td>
    <td></td>
    <td>Nathan</td>
    <td>11/6/22</td>
    <td></td>
  </tr>
  <tr>
    <td>Write a description of our authentication and authorization process.</td>
    <td>"What techniques are you using? What data is being stored where and how? 
How are you making sure users only access what they are allowed to?"</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/6/22</td>
    <td>11/6/22</td>
  </tr>
  <tr>
    <td>Create a list of all the pages in our app and their status</td>
    <td>Add links to wireframes for the pages that aren't completed yet</td>
    <td>Nathan</td>
    <td></td>
    <td>11/6/22</td>
    <td>11/5/22</td>
  </tr>
  <tr>
    <td>Create a list of all the API endpoints with a description of their behavior</td>
    <td>If you made changes since the previous milestone, make sure you update this table</td>
    <td></td>
    <td></td>
    <td>11/6/22</td>
    <td></td>
  </tr>
  <tr>
    <td>Add Entity Relationship diagram</td>
    <td></td>
    <td>Nathan</td>
    <td></td>
    <td>11/6/22</td>
    <td>11/5/22</td>
  </tr>
  <tr>
    <td>Add Individual Team Member Contributions</td>
    <td>(the tables in this file)</td>
    <td>Jack</td>
    <td>Jack</td>
    <td>11/6/22</td>
    <td>11/6/22</td>
  </tr>
</table>
