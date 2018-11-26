
===Description===
We combine data from multiple sources including Zillow, Yelp, Great Schools, and public records and created an interactive software tool to help home buyers find their ideal home. The underlying statistical model of our visualization has accurately predicted over 80% of the house values in our dataset and will provide a customizable and reliable estimation of the budget according to the customer’s preferences. 

===Installation===
You can download this package and run it based on the instructions below without installing any additional dependencies.  However, optionally you may sign up for a Google Maps API key here: https://developers.google.com/maps/documentation/javascript/get-api-key
Signing up for and placing your key in the Index.html file will allow you to remove the "For Development Purposes Only" watermark on the map visualization.  To do this replace the string: https://maps.googleapis.com/maps/api/js?sensor=true with https://maps.googleapis.com/maps/api/js?key=[YOUR API KEY HERE] in row 168 of the Index.html file.

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
