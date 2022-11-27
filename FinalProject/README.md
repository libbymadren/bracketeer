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

**Offline Functionality:** If a user has visited a page before going offline, these pages are still viewable when in offline mode. Otherwise, the user will view the Offline page, which gives a message stating that they are offline. This functionality is only available when the user is logged in, and does not apply to the Register, Login, and Home pages.  

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


<h2> Working Features </h2>
Users can...

* Make and manage accounts
* See user statistics (Tournaments created and joined)
* Create, edit, view, and manage Tournamnets
* Join and participate in Tournaments owned by other users via link or QR Code
* Create, edit, view, and manage a Bracket for each Tournament
* Choose Match and Tournament winners for Tournaments they own
* View Brackets offline

The features above have no known bugs or issues. The current build of our project contains no notable in-progress or otherwise not yet fully functional features.

<h2> Authentication/Authorization Process </h2>
<p>For authentication we are using JWT tokens and password hashing + salt using Argon2. The JWT token implementation is using the jsonwebtoken Node.JS libary. We have a jwt utility javascript file that facilitates generating, deleting, and verifiying jwt tokens. As a part of the jwt.js file we have a middleware function that is used within our protected routes. In terms of password storage, we are using Argon2 to hash passwords and we are generating a random salt value by using a sha256 hash of a random value. To integrate Argon2, we are using the node.js argon2 library: https://www.npmjs.com/package/argon2. Lastly, I would like to mention that our JWT tokens have a short expiry time of 5 min and are refreshed on every valid request. The users hashed passwords and salts are being stored in our database's user table. Authorization is being facilitated by our middleware, certain routes are protected and require a valid JWT, then that JWT's payload will provide the route/frontend page with necessary information to retrieve/dispaly data that the user should have access to.</p>

## ER Diagram
<img src="https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupT/blob/master/Milestone2/ER_Diagram.png"/>

## Caching Strategy
This site uses a cache-first strategy, due to the fact that only static resources (pages) are being cached. If this project were to be expanded upon, more dynamic resources would likely be cached a more hybrid cache strategy would be implemented in order to handle more behavior when offline.

## Individual Contributions

## Individual Contributions

<table>
    <thead>
        <th colspan="6">Preliminary</th>
    </thead>
    <thead>
        <th>Task Name</th>
        <th>Description</th>
        <th>Owner</th>
        <th>Contributors</th>
        <th>Due Date</th>
        <th>Completion Date</th>
    </thead>
    <tbody>
        <tr>
            <td>Create Task Plan</td>
            <td>Create a Google Sheets that maps out all tasks that need to be done and in what order those tasks need to be completed</td>
            <td>Jack</td>
            <td>Jack</td>
            <td>11/15/22</td>
            <td>11/15/22</td>
        </tr>
        <tr>
            <td>Set Up Repository</td>
            <td>Create final project directory</td>
            <td>Jack</td>
            <td>Jack</td>
            <td>11/15/22</td>
            <td>11/15/22</td>
        </tr>
    </tbody>
    
</table>

<br>
<br>
<br>

<table>
    <thead>
        <th colspan="3">Part One: Finish Core functionality</th>
    </thead>
    <thead>
        <th>Issue</th>
        <th>Assignee</th>
        <th>Completion Date</th>
    </thead>
    <tbody>
        <tr>
            <td>Change header formatting on /tournaments/create frontend page</td>
            <td>Jack</td>
            <td>11/16/22</td>
        </tr>
        <tr>
            <td>Add image upload/save to user avatar</td>
            <td>Jack</td>
            <td>11/17/22</td>
        </tr>
        <tr>
            <td>Refresh JWT when a user visits a new page</td>
            <td>Jack</td>
            <td>11/16/22</td>
        </tr>
        <tr>
            <td>Create responsive nav bar</td>
            <td>Jack</td>
            <td>11/18/22</td>
        </tr>
        <tr>
            <td>Create bracket view for tournament</td>
            <td>Jack</td>
            <td>11/24/22</td>
        </tr>
        <tr>
            <td>Create a page to view your created tournaments</td>
            <td>Jack</td>
            <td>11/17/22</td>
        </tr>
        <tr>
            <td>Create a page to view your entered tournaments</td>
            <td>Jack</td>
            <td>11/17/22</td>
        </tr>
        <tr>
            <td>Create join tournaments page</td>
            <td>Jack</td>
            <td>11/17/22</td>
        </tr>
        <tr>
            <td>Make join tournament page responsive</td>
            <td>Nathan</td>
            <td>11/18/22</td>
        </tr>
        <tr>
            <td>Make sure that every page is using a dynamic header</td>
            <td>Libby</td>
            <td>11/21/22</td>
        </tr>
        <tr>
            <td>Join confirmation page needs to load organizer username</td>
            <td>Nathan</td>
            <td>11/18/22</td>
        </tr>
        <tr>
            <td>Add error message if tournament doesn't exist on join confirm page</td>
            <td>Libby</td>
            <td>11/21/22</td>
        </tr>
        <tr>
            <td>Fix: User can join tournaments multiple times</td>
            <td>Nathan</td>
            <td>11/19/22</td>
        </tr>
        <tr>
            <td>Load banner image and participant images on tournament page</td>
            <td>Jack</td>
            <td>11/18/22</td>
        </tr>
        <tr>
            <td>Restrict access to tournaments</td>
            <td>Libby</td>
            <td>11/19/22</td>
        </tr>
        <tr>
            <td>Add end datetime to tournament</td>
            <td>Jack</td>
            <td>11/17/22</td>
        </tr>
        <tr>
            <td>Validate start and end dates for tournament creation</td>
            <td>Nathan</td>
            <td>11/24/22</td>
        </tr>
        <tr>
            <td>Add error handling to tournament create form</td>
            <td>Nathan</td>
            <td>11/19/22</td>
        </tr>
        <tr>
            <td>Input validation on the register page</td>
            <td>Nathan</td>
            <td>11/19/22</td>
        </tr>
        <tr>
            <td>Update profile page</td>
            <td>Jack</td>
            <td>11/17/22</td>
        </tr>
        <tr>
            <td>Allow tournament page to display end date</td>
            <td>Nathan</td>
            <td>11/18/22</td>
        </tr>
        <tr>
            <td>Fix: Tournaments entered stat on profile page includes tournaments created</td>
            <td>Jack</td>
            <td>11/18/22</td>
        </tr>
        <tr>
            <td>Fix: Ends field is showing up as undefined in tournaments page</td>
            <td>Nathan</td>
            <td>11/19/22</td>
        </tr>
        <tr>
            <td>Create edit page for tournament info</td>
            <td>Nathan</td>
            <td>11/21/22</td>
        </tr>
        <tr>
            <td>Fix: Non-organizers can edit tournaments</td>
            <td>Libby</td>
            <td>11/21/22</td>
        </tr>
        <tr>
            <td>Allow tournaments to be created on today's date at a future time</td>
            <td>Libby</td>
            <td>11/21/22</td>
        </tr>
        <tr>
            <td>Cleaner date formatting for start/end time on tournaments page</td>
            <td>Libby</td>
            <td>11/21/22</td>
        </tr>
        <tr>
            <td>Organizer field on tournaments page is showing up as user id</td>
            <td>Jack</td>
            <td>11/24/22</td>
        </tr>
        <tr>
            <td>Only tournament owner should be able to select winner of their tournament's matches</td>
            <td>Jack</td>
            <td>11/24/22</td>
        </tr>
        <tr>
            <td>Link up tournament edit page to the tournament page</td>
            <td>Jack</td>
            <td>11/24/22</td>
        </tr>
        <tr>
            <td>Allow for clicking on participant on tournament page</td>
            <td>Jack</td>
            <td>11/24/22</td>
        </tr>
        <tr>
            <td>Hide join container on tournaments page if matches have already been created</td>
            <td>Jack</td>
            <td>11/24/22</td>
        </tr>
    </tbody>
</table>

<br>
<br>
<br>

<table>
    <thead>
        <th colspan="6">Part Two: Implement Service Workers</th>
    </thead>
    <thead>
        <th>Task Name</th>
        <th>Description</th>
        <th>Owner</th>
        <th>Contributors</th>
        <th>Due Date</th>
        <th>Completion Date</th>
    </thead>
    <tbody>   
        <tr>
            <td>Discuss what offline functionality</td>
            <td>Discuss what and where offline functionality is needed</td>
            <td>Libby</td>
            <td>Libby, Jack, Nathan</td>
            <td>11/26/22</td>
            <td>11/22/22</td>
        </tr>
        <tr>
            <td>Create ServiceWorker.js</td>
            <td>Add code to handle caching and offline functionality</td>
            <td>Libby</td>
            <td>Libby</td>
            <td>11/26/22</td>
            <td>11/23/22</td>
        </tr>
        <tr>
            <td>Register service worker</td>
            <td>Add code to register a service worker when a user logs in</td>
            <td>Libby</td>
            <td>Libby</td>
            <td>11/26/22</td>
            <td>11/23/22</td>
        </tr>
    </tbody>
    
</table>

<br>
<br>
<br>

<table>
    <thead>
        <th colspan="6">Part Three: Make App Installable</th>
    </thead>
    <thead>
        <th>Task Name</th>
        <th>Description</th>
        <th>Owner</th>
        <th>Contributors</th>
        <th>Due Date</th>
        <th>Completion Date</th>
    </thead>
    <tbody>
        <tr>
            <td>Generate Manifest</td>
            <td>Generate manifest file</td>
            <td>Nathan</td>
            <td>Nathan</td>
            <td>11/25/22</td>
            <td>11/25/22</td>
        </tr>
        <tr>
            <td>Generate Icons</td>
            <td>Generate icons for various display types</td>
            <td>Nathan</td>
            <td>Nathan</td>
            <td>11/25/22</td>
            <td>11/25/22</td>
        </tr>
        <tr>
            <td>Test Installable App</td>
            <td>Generate manifest file</td>
            <td>Nathan</td>
            <td>Nathan</td>
            <td>11/26/22</td>
            <td>11/26/22</td>
        </tr>
    </tbody>
    
</table>

<br>
<br>
<br>

<table>
    <thead>
        <th colspan="6">Part Four: Final Project Writeup</th>
    </thead>
    <thead>
        <th>Task Name</th>
        <th>Description</th>
        <th>Owner</th>
        <th>Contributors</th>
        <th>Due Date</th>
        <th>Completion Date</th>
    </thead>
    <tbody>
        <tr>
            <td>Final Progress</td>
            <td>(description of your features) and what doesn't work (any known issues)</td>
            <td>Nathan</td>
            <td>Nathan</td>
            <td>11/26/22</td>
            <td>11/26/22</td>
        </tr>
        <tr>
            <td>Authorization and Authentication Writeup</td>
            <td>What techniques are you using? What data is being stored where and how? How are you making sure users only access what they are allowed to?</td>
            <td>Jack</td>
            <td>Jack</td>
            <td>11/26/22</td>
            <td></td>
        </tr>
        <tr>
            <td>Pages List</td>
            <td>How to navigate them, and the offline functionality they provide</td>
            <td>Libby</td>
            <td>Libby</td>
            <td>11/26/22</td>
            <td>11/26/22</td>
        </tr>
        <tr>
            <td>Description of caching strategy</td>
            <td>A description of your caching strategy and why you chose it</td>
            <td>Libby</td>
            <td>Libby</td>
            <td>11/26/22</td>
            <td>11/26/22</td>
        </tr>
        <tr>
            <td>API Description</td>
            <td>A list of all API endpoints with a description of their behavior. If you made changes since the previous milestone, make sure you update this table.</td>
            <td>Nathan</td>
            <td>Nathan</td>
            <td>11/26/22</td>
            <td>11/26/22</td>
        </tr>
        <tr>
            <td>Final ER Diagram</td>
            <td>Final ER digram reflecting final database structure</td>
            <td>Jack</td>
            <td>Jack</td>
            <td>11/26/22</td>
            <td></td>
        </tr>
        <tr>
            <td>Individual contributions section</td>
            <td>Tasks completed by team members</td>
            <td>Jack</td>
            <td>Jack</td>
            <td>11/26/22</td>
            <td></td>
        </tr>
    </tbody>
    
</table>
