# Web application for Teaterstickorna

The webapplication allows for users to log in, chat and plan in the calendar.

Admins will further have access to add, edit or remove users as they see fit.


# Framework

The back-end uses Java with springboot  
The front-end uses React with Redux


# Instructions 

## Login

<b>Step 1:</b> Start upp the FE and go to the login page (should be default on startup) use npm start.

<b>Step 2:</b> Have The BE runing (You will need some sort of user to login with).

<b>Step 3:</b> login with Email and password from a user that exsist in BE.

Congrats you have loged in.

## NavBar (Navigation) 

The navbar utilizes <b>react-router</b> found inside <b>App.js</b>  
The user would see the landing page with a navbar that display all places you can go to, (home : Info : Chat : Kalendar: Dokument : Settings ).  
For Admins (Hantera Användare) also.

<b>Home:</b> Is the landing page when you have logged in to an account.  
It have a about us, Social and Contact section. 

<b>Info:</b> Is where you can find all events and plays that would take place.  
Admins / Teachers could create a new event.  
Created events should be displayed in a list that could be searched and found in dokuments.

  <b>Chat:</b> Here you could find all your firends and users and start a chat with them. 

<b>Kalendar:</b> You could put upp personal things that you want to remember. 

<b>Dokument:</b>  Here you find the script ( if you have any) to a play you are in.

<b>Settings:</b> Is where you could change you profile. 



