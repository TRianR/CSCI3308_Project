### Who: 
Tyler Glotz, Tyler Rostenbach, Meri Burgess, Jessica Evans, Cassie Souza
###Title:
Timmys Lost Dimension
### Vision:
We are making a dynamic game with a rich user experience that is entertaining and fun

# Automated Tests: 
###Tool used:
* Selenium
* http://www.seleniumhq.org 
### Explanation: 
* Selenium is a Firefox plugin used to automate testing for brower based applications. With Selenium you can record your actions in the browser and it will build a script. Then you can run that script as many times as necessary as a test or part of a test suite. You can also insert script functions manually. 

### Screenshots of tests:
http://imgur.com/a/VRIBX



# User Acceptance Tests: 
Copy of at least three UAT plans

|***********************************************************************|
Use Case ID: UC-01
Use Case Name: Account Login
Description: User can log on to their account to keep track of and look at their game score(s).

Users: Player
Preconditions: Database has scores and a password assigned to a username. User is not logged on.
Postconditions: Player is logged onto their account
Frequency of Use: Daily by players
Flow of Events: 		
		| Actor Action                                        | System Response            | Comments |
		|-----------------------------------------------------|----------------------------|----------|
		| 1. Clicked the Login from the Homepage              | Directed to the Login Page |Not quite sure what is 												      |wrong with the link 
		| 2. Entered in Username and Password into the fields | Access to previous  scores |Will work once databse 												   |is set up          

Test Pass?:  Fail
Notes and Issues:
|Still working on setting up a database, having issues connecting to local host|


|***********************************************************************|
Use Case ID: UC-02
Use Case Name: Scoreboard
Description: Player can view previous and updated scores on the scoreboard page while logged on

Users: Player
Preconditions: Player is logged in and has played at least on game on said account
Postconditions: Player viewed the last 10 scores they have earned
Frequency of Use: Daily by players
Flow of Events:
		| Actor Action                  | System Response                 | Comments                          |
		|-------------------------------|---------------------------------|-----------------------------------|
		| 1. Click on Scoreboard Button | Directed to the Scoreboard Page | Player then sees  previous scores |
		| 2. Click on Play Game Button  | Directed to the Game Screen     |                                   |
		| 3. Play game until end        | Displays score for current game |                                   |
		| 4. Click on Scoreboard Button | Directed to the Scoreboard Page | Player sees update scoreboard     |
Test Pass?: Fail
Notes and Issues:
|Scoreboard database not up and running***********************************|


|***********************************************************************|
Use Case ID: UC-03
Use Case Name: Forum Posting
Description: Player can post on Forum Page to discuss game with other players

Users: Player
Preconditions: Player is logged in
Postconditions: Player has made a post on the forum for other players to view
Frequency of Use: Daily by players
Flow of Events:
		| Actor Action             | System Action              | Comments |
		|--------------------------|----------------------------|----------|
		| 1. Click on Forum button | Directed to Forum page     |          |
		| 2. Click "Start a topic" | Post is added to the forum |          |
		| 3. Click on forum post   | Views forum post           |          |
Test Pass?: Pass
Notes and Issues: 
|User must login to be able to post to the forum |

