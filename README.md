Provide access to NASA's Mars Rover Photos – README

User part:

A site that allows access to NASA missions by api requests.
After registering and connecting to the site, the user is given full access to the site's services.
By choose a mission, camera and date to get a whole collection of photos taken that day on Mars - the Red Star

Information:
On the site you can find a wealth of information about the use of the spacecraft and about the rovers launched into space by NASA
Search queries:
Step A:  Select a mission.
Step B:  Select a camera - Only cameras that are suitable for the mission can be selected.
Step C:  Choose a date on Earth or a solar date (a day on a mission across the planet)
The system assists in the validation process in order to reduce the search to relevant days for each mission.
After viewing the photo collection you can save favorite photos in the database for future reuse.
Edit mode:
After clicking on edit mode, you can access the saved data in the database and make changes such as deleting a single item or a total mica of all the images and resetting the list.
Carousel mode:
The site supports the display of saved images by activating a carousel that works automatically to display images.
 Note that the carousel can only be activated if there are stored images in the system.
Registration process:
In order to register for the site, you must provide an email address that does not exist in the username and family name system,
After clicking the Continue button using AJAX we move on to selecting the password.
When the user has exactly 60 seconds to select a password to confirm it if it does not meet the deadlines, he is transferred to another page that is reprimanded and he must start the registration again.
If he succeeds, he is taken to a page that congratulates him on his success and congratulations
Login process:
Once the user is registered on the site, he can connect to it by using the email with which he registered and with the password he chose. If there is a problem verifying the username and password, an error note will be displayed to the user.


The programmer's part:
https://api.nasa.gov
This API is designed to collect image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars and make it more easily available to other developers, educators, and citizen scientists. This API is maintained by Chris Cerami.
Each rover has its own set of photos stored in the database, which can be queried separately. There are several possible queries that can be made against the API. Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date. A photo taken on Curiosity's 1000th Martian sol exploring Mars, for example, will have a sol attribute of 1000. If instead you prefer to search by the Earth date on which a photo was taken, you can do that, too.
Along with querying by date, results can also be filtered by the camera with which it was taken and responses will be limited to 25 photos per call. Queries that should return more than 25 photos will be split onto several pages, which can be accessed by adding a 'page' param to the query.
Each camera has a unique function and perspective, and they are named as follows:
 
Our special additions:

•	In each operation a request is sent to the server in order to receive the most up-to-date information in real time.

•	All passwords on our site are secured by built-in bcrypt directory encryption.

•	The site uses SQLITE as a database to store the users and the eight images.

•	Database access is done by sending SQL queries to our database.

•	Update the task of choose, and after the user selects a task - the list of cameras is updated accordingly! In a dynamic way.

•	When we click on Clear All, we chose to exit edit mode, because there is nothing more to edit in the list of images. When we click on Slide Show when Edit mode is running, we will exit Edit mode and switch to Slide Show mode and vice versa.

•	All of our photos and gifs are in the files in the project to avoid a situation where they are trying to get the image and it does not load.

•	Each user's request to the database must be verified by the token assigned to the user in the login in order to avoid a situation of receiving requests off-site.
•	In addition, the user must be logged in to have full access to the site's capabilities in case he logs out or the session is deleted (accidentally or intentionally) The user will be taken to the login page in order to log in again.

•	In the event of an unexpected error such as a server crash or disconnection of the database, an appropriate error message will be displayed





