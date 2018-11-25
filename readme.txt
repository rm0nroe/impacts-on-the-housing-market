
===Local Setup===
1. Recommended to deploy via python SimpleHTTPServer so API calls go through without CORS error
	a) Open terminal and navigate to directory location of project
	b) If you have Python installed you can run the following command: 
		python -m SimpleHTTPServer
	c) The web app is deployed to http://localhost:8000/


===Deployment===
If you'd like to deploy your changes, you can go to https://blog.teamtreehouse.com/deploy-static-site-heroku and they will step you through a very simple process to get your changes deployed

- Essentially, create a heroku account.
- Go to project location on local, create new heroku app in terminal (heroku apps:create home-buying-helper)
- Git Init(if not done already), add all, and prepare a commit on your project(git init >>> git add . >>> git commit -m "my commit message")
- Finally, enter >>> git push heroku master
- The app will be deployed at https://<whatever-name-you-selected>.herokuapp.com/ 
