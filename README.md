# HelpSavvy Financial
​
## Team Name: **Deadline Chasing Devs**
​
[Link to Deployed Project](https://hackathon-finrev-2023.herokuapp.com/)
​
## Contents
​
* [User Experience (UX)](#user-experience)
  * [User Stories](#user-stories)
* [Technology](#technology)
* [Design](#design)
  * [Color Scheme](#color-scheme)
  * [Typography](#typography)
  * [Imagery](#imagery)
  * [Wireframes](#wireframes)
* [Deployment & Usage](#deployment)
* [Testing](#testing)
* [Credits](#credits)
  * [Code](#code)
  * [Content](#content)
  * [Media](#media)
  * [Acknowledgements](#acknowledgements)
​
## User Experience
We wanted the user to easily plan out their holiday by using our budgeting app. Budgeting their monthly expenses and income would help the user be more prepared and stress-free about their money. They can use the app to keep track of their monthly spending. 
​
### User stories
- **As a user** I want to understand how to manage my income **so that** I am handling my expenses more efficiently.
- **As a user**, I want help budgeting with the 50:30:20 rule **so that** I can keep my finances in order.
- **As a user** I want to track my expenses on a monthly basis **so that** I can see how much I spend each month.
- **As a user** I want to keep up to date with the  latest news in my region **so that** I am aware of current events, especially those related to business and finance.
​
## Technology:

### Languages:
  * Python, for basic Django framework, user login and database management
  * Javascript, for the Newscatcher API, Alphavantage API's and some frontend rendering
  * HTML
  * CSS


### Tools and Frameworks
  * Django, Python Framework
  * JQuery, JavaScript Framework
  * Bulma, CSS framework


## Initial MVP idea

### Initial Idea

The initial idea was to make a budget-planner where you could input income / expense / target sum to plan things such as trips etc.
We ended up doing a more general finance thing that can sort of aggregate a lot of different tools depending on what you're interested in,
wether it'd be planning a budget, view stocks, currency or financial related news.
​
### Actual idea & content:
​
We made a budgeting app which also allows the user to check the latest finance and economy news. It helps the user track their expenses and saves them in the account they've signed up with so the data is not lost once they exit the site.
​
## Design
​
### Color Scheme:
We chose a very neutralcolourr palete to give the webpage a professional look. 

![colour](/documentation/colour-palette.png)
![Colour Palatte](/documentation/color.png)
​
### Typography:
We chose the following fonts for this hackathon project:
- Josefin Sans

![Josefin-sans](/documentation/josefin-sans.png)
​
- Noto Serif

![Noto Serif](/documentation/noto-serif.png)

- Inter

![Inter](/documentation/inter.png)

### Imagery:
- The images on the page were taken from [pexels](https://www.pexels.com/) which is a free stock images page.

![Cover picture](/documentation/cover-image.png)
![Attractions photos](/documentation/stock-photos.png)

### Wireframes:
​
- Mobile Wireframes:

​![mobile wireframe](/documentation/mobile-version.jpg)

- Desktop Wireframes:
​

​![Desktop Wirframes](/documentation/desktop-version.jpg)
​
The cover image gives a basic understanding of what the site is about and to explain this further, we have added an 'Our Purpose" section. Then we have an "Our Services" section which shows what this site can be used for. The boxes in this section are buttons which take the user to the related page. 
​
## Deployment
- This site was developed in (Gitpod)[https://www.gitpod.io/] and deployed to (Heroku)(https://www.heroku.com/)]
- It was built using the Django framework.
- The site was developed by previewing the site in the browser through Port 8000 in Gitpod by running the command ```python manage.py runserver``` in the terminal. Changes and entries to the workspace were then committed and pushed to this Github repository.
### Setting up the project in Gitpod workspace:
1. Install django by running the following command ```pip3 install Django```
2. Install gunicorn for running the deployed website ```pip3 install gunicorn```
3. To install postgres to support the database ```pip3 install dj_database_url pyscopg2```
4. Install any other required libraries by running similar commands and add them to a requirements.txt file so that Heroku will install them at deployment. This is done by running ```pip3 freeze --local > requirements``` in the terminal and can be run again when necessary to add further libraries.
5. Create your Django project by entering the following command: ```django-admin startproject < YOUR PROJECT NAME >```
6. To create a django app, run ```python manage.py startapp < YOUR APP NAME >```
7. Add the name of the newly created app to "INSTALLED_APPS" in settings.py.
8. Development of apps can begin from here.
### Deploying to Heroku
1. Once logged into Heroku, choose the option 'Create App'.
2. Attach the database in the Resources tab in Add-ons. Search for 'Heroku Postgres' and add.
3. In your workspace, create an env.py file which will store environment variable and add it to .gitignore so as not to expose any sensitive information publicly in Github.
4. Store your 'SECRET_KEY' and 'DATABASE_URL' here and import into settings.py
5. In Heroku, under settings, choose 'Reveal Config Vars and add your 'SECRET_KEY' and 'DATABASE_URL'.
6. Migrate to the database in Gitpod using ```python manage.py makemigrations``` followed by ```python manage.py migrate```
7. Add your Heroku app URL to "ALLOWED_HOSTS" in settings.py.
8. Create a Procfile in the top level of the directory and add ```web: gunicorn projectname.wsgi``` so Heroku knows how to run the project.
### Initial deployment:
1. Push any changes to Github after connecting your Heroku app to your repository.
2. Add DISABLE_COLLECTSTATIC with a value of 1 to Heroku config vars.
3. Select Github in Deployment method and choose 'Deploy branch' under Manual Deploy, ensuring your main branch is chosen.
### Subsequent deployments:
1. For subsequent deployments, I chose to 'Enable Automatic Deploys' which meant that anytime changes were pushed to my main Github branch, the Heroku project redeployed.
2. For the final deployment, ensure you have a dependency to handle your static files. I used whitenoise, install with ```pip install whitenoise``` and add to MIDDLEWARE in settings.py and change STATIC_FILES_STORAGE variable to ``STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'``
3. Remove DISABLE_COLLECTSTATIC config var.
4. Change DEBUG to False in settings.py
5. Push changes and deploy.
​
## Testing
A number of manual tests were carried out on this porject:
- User authentication: User sign up and login was tested successfully
- Javascript 50:30:20 on Budget tool was tested to ensure no errors. Worked successfully
- Track Expenses app was tested for full CRUD functionality. Users can add, Edit, Delete and Display monthly expenses
- News API was tested by making calls and ensuring news displayed on page, this was done successfully and API key was acceped
​
## Credits
### Code
- Some of the styling inspiration for the FAQ page was taken from this [youtube link](https://www.youtube.com/watch?v=MXrtXg1kpVs&t=412s).
​
### Content
 - The inforamtion to the 50/30/20 budgeting rule was taken form this [link](https://www.thebalancemoney.com/the-50-30-20-rule-of-thumb-453922).
​
### Media
- The images for the home page were taken from [Pexels](https://www.pexels.com/).

### Acknowledgements

- Thank you to all the team member for the hard work and cooperation.
  - Edmir- [GitHub Link](https://github.com/Edmir-Demaj)
  - Fatima- [GitHub Link](https://github.com/fatimaqais)
  - Sam- [GitHub Link](https://github.com/SamMartin92)
  - Carl- [Github Link](https://github.com/carl2087)
  - Jim- [GitHub Link](https://github.com/Enquil)
  - Bogdan- [GitHub Link](https://github.com/BogdanFSD)
