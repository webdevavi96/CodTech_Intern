# Welcome visitor

This repo contains my all projects of my Internship at CODTECH IT SOLUTIONS. In this markdown file you will see all of my progration I made daily.

## [News Project](https://github.com/webdevavi96/CodTech_Intern/tree/main/NewsProject)

### Day - 1

Today I started building my first project which is a new website which fetches new and articles from public news API's andshows on website. Today I completed the setup of my project and built layout with navigation bar and footer.

### Day - 2 & 3

In these two days I improved the UI and API calls for latest news which done by passing the date dynamically. Added a loading screen during the news loads first time.

#### Project Snapshots

These three images are represntation of my [news project](https://github.com/webdevavi96/CodTech_Intern/tree/main/NewsProject)

*Home Page*
![Home Page](/ProjectSnapshots/home.png)

*About Page*
![About Page](/ProjectSnapshots/about.png)

*Responsive Page*
![Responsive Page](/ProjectSnapshots/responsive.png)

-----------

## [ChatApp](https://github.com/webdevavi96/CodTech_Intern/tree/main/ChatApp)

### Day 4 & 5

In these two days I worked on UI design, System Design and Database relation diagram. On day 4 I started client side developement and built Landing page, Navbar, Footer and placed them into React Outlet to render in browser using createbrowserroutes. All routes mapping is done. Now moving farwad to build other pages.

### Day 5 & 6

In these two days, I finished Chat page layout and Calls page layout with some basic functionalities. The UI of this project is inspired by Whatsapp UI. Managed status using useState.

### Day 7 & 8

In these two days I have intigrated email otp verification using google smtp, redis for caching, connected mongodb, secured environment veriables and accessing using dotnev package.

*Next steps:*

Now I'll connect client side with backend and resolve the CORS ORIGIN ERRORS, establise connection for all user auth routes and add JWT Token for verification and user data security.

### Day 9 & 10

In thses two days, I connected Client and Server, resolved cors error, tested User registration, OTP verification, login, token based login, user data caching, jwt token implentation with expiry timer and logout features. Now the basic user intraction is done.

*Next Steps:*

Moving farward to implement CRUD operation for user profile. After implementing CRUD, I'll move to the main feature of this project and intigrate Live Chatting using *Socket.IO*.

### Day 11 & 12

In these two days I fixed auth middleware, implemented refresh jwt token function when token is expired, improved UI when there is no user available to chat and calls, cleane log out function.

*Next Steps:*

I know I promised to implement some features but there was several bugs which causes isseus in UI so I thaught I'll fix them first then move farward to implement live chat feature.

### Day 13

Today I fixed the issue in cookies during setting, it was caused due ***inversed logic of cookies***.Today I fixed it and ***enabled one to one chat*** with a better UI for chatting page. There were some minor bugs in the Layout, are fixed now.

*Next Steps:*

These are my next steps ->

- Current time users can't see there previous messages after refresh or re-visiting site. So my next steps are to fetch the messages from *Databse* and show them in chat.

- Some users might not want to set profile avatar, so I'll implement default avatar for better UX.

- Improve user *online/offline* status.
