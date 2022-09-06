# Noob Insider, Authors: Taylor Phillips, Eamonn Kelly and Hazel Rahbe

## **App description**

**Noob Insider**
How many times have you searched Google looking for the new best games that are on the market? If this is you or someone you know, then you have came to the right place. Noob Insider is the app for all gamers to see upcoming games, new games and articles from our authors regarding improvements, updates and bugs concerning your favorite games. Also, our app is user focused, so make sure to create a account upon arrival. Once you have your own account feel free to rate and comment on each game. Never heard of a game on our website? No problem, watch the trailer to see if this is a game you would like to check out for yourself. 

## **Noob Insider Pictures**
<img width="1305" alt="Screen Shot 2022-09-01 at 2 41 38 PM" src="https://user-images.githubusercontent.com/109078858/187989538-07930f56-e806-4628-a2cf-f642782432ef.png">

This first picture depicts our concept for our home page. Our homepage consists of our upcoming game, our section containing our featured games, as well as where you can navigate to our other pages and login/register your account.


![Screen Shot 2022-09-02 at 9 39 30 AM](https://user-images.githubusercontent.com/109078858/188174156-9fbd4d7e-1c4b-4497-9a3c-6d0f920e7298.png)

Here is our final homepage compared to our wireframe concept. As you can see there are several similarities and we stayed really close to our concept. From the home page you have a nav bar to navigate to the home page, the news sections, login and register for your account and your logout button. Also, you can view the upcoming game and all of the featured games on our website.


![Screen Shot 2022-09-02 at 9 40 01 AM](https://user-images.githubusercontent.com/109078858/188174819-a6051f22-62e3-45a0-be90-ea306c9196bf.png)

Here is our latest news page. This page is articles created by our authors that will give updates on various games, as well as bugs in the game, new content and various news about the game from the industry.


![Screen Shot 2022-09-02 at 9 40 27 AM](https://user-images.githubusercontent.com/109078858/188175088-7364a3ad-6acb-48ce-b25a-c9d320328cbe.png)

When you first come to our website you should register for a account. This is our register page where you can create a account and have access to create comments and view all the content on our website.


![Screen Shot 2022-09-04 at 2 08 52 PM](https://user-images.githubusercontent.com/109078858/188329731-84bc9bc3-334c-4156-90d6-ff002b3bd931.png)

When you come to our website and want to get more information about the game, here is the screen you will get. On our game (show) page you will get information about the genre of the game, price, the platforms the game is available on and a trailer to check out game-play. Also, if you are a signed in user you can add ratings and a comment for the game. You can also see all comments made my other users as well!


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


## **Challenges**
![Screen Shot 2022-09-05 at 7 19 06 PM](https://user-images.githubusercontent.com/109078858/188523018-370c14b2-d2eb-41ed-971e-bbd34846097e.png)

This was a function that took us some time to figure out how to accomplish. We wanted to be able to take the ratings from all the users and have an average user rating display for each game. This was really rewarding when we were able to figure this function out. 


![Screen Shot 2022-09-06 at 8 19 52 AM](https://user-images.githubusercontent.com/109078858/188645877-d915bb1e-02a8-4aa3-ac37-059f06c7a21e.png)

Here are conditional statements that we added into our code regarding the use of editing and deleting content. We wanted it where only admin could edit or delete content on the game and not users visiting the site. This was a challenge that we were able to overcome. 



## **Link to Noob Insider**

**GitHub source code:** https://github.com/tjphillips08/Video-game-news

**Heroku App:** https://obscure-fortress-74365.herokuapp.com/games


## **Next Steps**

First of all, this project was very rewarding for all of us. We were able to push ourselves and learn more than we thought possible. There are definitely some things we would like to continue working on for this project. First, we want to add more CSS styling and improve the overall look of the website. We want to incorporate Bootstrap and add navigation bars to our pages. Also, right now on our website the Admin (determined by our unique Id's) has the access to delete users comments. However, we would like to add where the current user can delete their own comment if there are errors or they would rather just delete their comment. Finally, we want to use API's for our data in the future. We created our own database for this project, but would be very beneficial in our website expansion to include a API that includes the game data we are using, so we can populate games on a larger scale. 











