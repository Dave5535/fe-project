# Web application for Teaterstickorna

The web application allows for users to log in, chat and plan in the calendar.

Admins will further have access to add, edit or remove users as they see fit.


# Framework

The back-end uses Java with springboot  
The front-end uses React with Redux

# Instructions

## Login

**Step 1:** Start upp the FE and go to the login page (should be default on startup) use npm start.

**Step 2:** Have The BE runing (You will need some sort of user to login with).

**Step 3:** Login with Email and password from a user that exsist in BE.

Congrats you have logged in.

## NavBar (Navigation)

The navbar utilizes **react-router** found inside **App.js**  
The user would see the landing page with a navbar that display all places you can go to, ( Home | Info | Chat | Kalender | Dokument | Settings ).  
For Admins (Hantera Användare) also.

**Home:** Is the landing page when you have logged in to an account.  
It have an **about us**, **Social** and **Contact** section.

**Info:** Is where you can find all events and plays that would take place.  
Admins / Teachers could create a new event.  
Created events should be displayed in a list that could be searched and found in **Dokument**.

**Chat:** Here you could find all your friends and users and start a chat with them.

**Kalendar:** You could put upp personal things that you want to remember.

**Dokument:** Here you find the script (if you have any) to a play you are in.

**Settings:** Is where you could change you profile.

**Hantera Användare:** Is where Admins could create / edit / remove and se details of users.

# Where is What (For devs)

### Structured code as follows.

**Public:** File, Image , Index.html, style.css

**src:** Chatfeatures , components , store

App.js

index.js

### What page referring to what file ( Could also be seen in App.js (src/App.js)).

**Login**: src/components/Login.js

**Home**: src/components/Welcome.js

**Info**: src/components/Info.js , src/components/InfoList.js

**Chat**: src/components/Chat.js , and from components To Chatfeatures and there is the rest of the code for all chatfunctions.

**Kalender**: src/components/Calendar.js

**Document**: src/components/Documents.js

**Settings**: src/components/settings.css

### Redux Store Construction.

**chat / conversations:** src/Store/AppSlice.js

**play / event:** src/Store/playSlice.js

**role:** src/Store/roleSlice.js

**users:** src/Store/userSlice.js

**config:** src/Store/ConfigureStore.js
