# Noob Insider, Authors: Taylor Phillips, Eamonn Kelly and Hazel Rahbe

## **App description**

**Noob Insider**
How many times have you searched Google looking for the new best games that are on the market? If this is you or someone you know, then you have came to the right place. Noob Insider is the app for all gamers to see upcoming games, new games and articles from our authors regarding improvements, updates and bugs concerning your favorite games. Also, our app is user focused, so make sure to create a account upon arrival. Once you have your own account feel free to rate and comment on each game. Never heard of a game on our website? No problem, watch the trailer to see if this is a game you would like to check out for yourself. 

##**Noob Insider Pictures**
https://www.figma.com/file/eer7nRVZIx2QWc0AE5yYQ6/Diagram---Homepage-Draft?node-id=101%3A2

This first picture depicts our concept for our home page. Our homepage consists of our upcoming game, our section containing our featured games, as well as where you can navigate to our other pages and login/register your account.


Placeholder for our homepage
Description of our homepage


Placeholder for our show page
Description for our show page

Placeholder for our news page
Description for our news page

Placeholder for our register page
Description for our register page


## **Technologies Used**

For this website we used several different forms of technology.
We used HTML to create our form layouts, our partials for our header, navigation and footer. Inside our HTML(which is our EJS files) we used Javascript functions to display the correct games on pages, as well as functionality of user ratings.

We used CSS to organize and decorate our HTML pages. We used CSS grid to align our games correctly and evenly on the pages. We also used CSS to organize our game info data to be more asthetically pleasing for the user. We also added different fonts for our text and colors to our backgrounds.

We used Javascript to build the functionality of our app. For this to work correctly we had to use conditional statements to add user rating from our user comments. We had to use async functions along with await to run various functions that would pull information from our databases and display them on our HTML pages. The bulk of our app is built through Javascript. We also used Javascript in controllers that would be our reference to our different pages of our website/app. 

We used Express to write handlers for requesting our HTML pages. This gave us the ability to create various routes to our HTML pages and have them display the correct information that we set up.

We used MongoDB as our database for this app. With MongoDB we were able to store our users, comments, and our game information that we created. This allows for users to sign in and us to store their information for future visits to the website. Also, gave us the ability to tie our comments to the game the comment was made upon.

We used Mongoose to create our modeling system for the MongoDB database. This allowed us to create Schemas that would have the key-value pairs for our objects(user, comments and games). 

We used bcyrptjs to allow for us to be able to reference and match user information to their registered account. To protect users their passwords have been salted and bcryptjs allows for us to compare through the salt to find out if that information matches a user already in the database. 

Finally, we used express-session and connect-mongo to create sessions for our users. Express-session allowed us to create a time-frame that users would be active in our website before being automatically logged out. 


## **Link to Noob Insider**

will add link here

## ** Next Steps**

What will be our next steps in this project?











