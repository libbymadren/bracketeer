# Bracketeer
## Group T: Milestone 2
### Group Members: Jack Randle, Libby Madren, Nathan Turpin

## Frontend Routes

Pages    | Status | Contributor(s) | Wireframe
-------- | ------ | -------------- | ---------
Home     | ✅     | Libby          | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-groupT-Wireframe-Landing.png)
Profile  | ✅     | Libby          |
Register | ✅     | Jack, Libby    | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342%20-%20Wireframes-register.png)
Create   | ✅     | Nathan         | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-createjoin.png)
Edit     | ✅     | Nathan         | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-edittournament.png)
T. View  | ✅     | Jack           |
Matches  | 0%     | N/A            | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-bracketviewedit.png)
M. View  | ✅     | Jack           | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-bracketviewedit.png)
Join     | 50% (currently part of T. View) | N/A | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Proposal/Wireframes/csc342-Wireframe-createjoin.png)

**7.5 pages / 9 pages = 83%**

## API Routes

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


## ER Diagram
[diagram](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Milestone2/ER_Diagram.png)

## Individual Contributions
** Link file here when it's finished? **
___

<h2> What is Done </h2>
<p>xxx</p>

<h2> What is Not Done </h2>
<p>xxx</p>

<h2> Authentication/Authorization Process </h2>
<p>xxx</p>

