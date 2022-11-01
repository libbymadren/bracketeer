# Bracketeer
## Group T: Milestone 1
### Group Members: Jack Randle, Libby Madren, Nathan Turpin

### Frontend Routes

Pages    | Status | Contributor(s) | Wireframe
-------- | ------ | -------------- | ---------
Home     | ✅     | Libby          | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-groupT-Wireframe-Landing.png)
Profile  | ✅     | Libby          |
Register | 0%     | N/A            | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342%20-%20Wireframes-register.png)
Create   | ✅     | Nathan         | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-createjoin.png)
Edit     | ✅     | Nathan         | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-edittournament.png)
T. View  | ✅     | Jack           |
Matches  | 0%     | N/A            | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-bracketviewedit.png)
M. View  | ✅     | Jack           | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-bracketviewedit.png)

6 pages / 8 pages = 75%

### API Routes

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
`GET`    | `/users/:userId`                              | Return a specific user                                          | Nathan
`GET`    | `/users`                                      | Return all users                                                | Nathan
`GET`    | `/users/:userId/matches`                      | Returns all matches for a specific user                         | Libby
`DELETE` | `/users/:userId`                              | Delete a specific user                                          | Libby
`PUT`    | `/users/:userId`                              | Create/Update a specific user                                   | Libby
`POST`   | `/login`                                      | Receives an email and password to log a registered user in      | Libby
`POST`   | `/join/:joinId`                               | Receives passcode or QR Code                                    | Jack
`POST`   | `/users`                                      | Creates a new user account and returns the new user object      | Libby
`GET`    | `/matches/:matchId`                           | Return a specific match                                         | Jack


<h2> What is Done </h2>
<p>We have implemented all endpoints that we think we currently need for our main implementation. We have also used mock data to complete the majority of our HTML pages.</p>

<h2> What is Not Done</h2>
<p>We still need to implement the following: User authentication system, database for storing persistent data, the view matches page which will require a good amount of design before implementing. A method of joining tournaments by qr code (the qr code is being generated, but it currently doesn't join you to a tournament).</p>
