README - Access NASA's Mars Rover Photos

User Part:

Introduction:
This site provides access to NASA's Mars rover photos through API requests. Upon registration and login, users gain full access to the site's services. Users can choose a mission, camera, and date to retrieve a collection of photos taken on Mars.

Site Information:
The site offers comprehensive information about NASA's spacecraft usage and the rovers launched into space. Users can search for photos using the following steps:

Step A: Select a mission.
Step B: Choose a camera - Only cameras suitable for the selected mission are available.
Step C: Select a date on Earth or a solar date (a day on Mars).

The system assists in validating the search criteria to narrow down relevant days for each mission. Users can save their favorite photos in the database for future use.

Edit Mode:
By entering edit mode, users can access their saved data in the database. They have the option to delete individual items or clear the entire image list.

Carousel Mode:
The site supports a carousel mode that automatically displays saved images. Please note that the carousel is activated only if there are stored images in the system.

Registration Process:
To register, users must provide a unique email address not already in the system. After entering the email and clicking "Continue," users proceed to select a password. They have 60 seconds to choose and confirm the password. Failure to meet the time limit redirects them to a new page to restart the registration process. Successful registration leads to a congratulatory page.

Login Process:
Registered users can log in using their email and chosen password. If there is an issue with verifying the credentials, an error message will be displayed.

Programmer's Part:

API Information:
The API, maintained by Chris Cerami, allows developers, educators, and citizen scientists to access image data collected by NASA's Curiosity, Opportunity, and Spirit rovers on Mars. Each rover has its own set of photos stored in the database, which can be queried separately.

Querying the API:
Photos are organized by sol (Martian rotation or day) on which they were taken, starting from the rover's landing date. Alternatively, photos can be searched using the Earth date on which they were taken. Queries can also filter results by the camera used. Each query fetches a maximum of 25 photos per call. If more than 25 photos are expected, the results will be split into multiple pages using a 'page' parameter.

Special Additions:

Real-time Updates: Requests sent to the server ensure access to the most up-to-date information.
Password Security: All passwords on the site are securely encrypted using the bcrypt directory.
Database and Storage: The site utilizes SQLite as the database to store user data and images. Photos and gifs are stored within the project files to ensure seamless access.
Dynamic Camera List: The list of cameras is updated dynamically based on the user's selected mission.
Edit Mode and Slide Show: Clicking "Clear All" exits edit mode, and clicking "Slide Show" while edit mode is active switches to slide show mode and vice versa.
Token-based Authentication: Each user's database request requires verification using their assigned token during login to prevent unauthorized requests.
Session Management: Users must be logged in to access the site's full capabilities. If logged out or if the session is deleted, users will be redirected to the login page.
Error Handling: In the event of unexpected errors like server crashes or database disconnections, appropriate error messages will be displayed.
Note: This README provides an overview of the site, its functionalities, and the underlying API. For detailed technical information, refer to the provided API documentation and source code.
