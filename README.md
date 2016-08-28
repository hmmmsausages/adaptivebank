#	Supplemental Files of MSc Project One Size Fits None - An Adaptive Training Add-On
##	Web Intelligence MSc - 2015/16


## File structure: (adaptivebank/)
* client : start-up and routing files for client-side
* server : start-up files for server-side
* imports : 
 * adaptivebank : API, components and layout of mock-up online bank
 * adaptivetraining: API, components and layout of adaptive training add-on
* private:
 * instructions.json : Contains all task classes and learning tasks for training add-on
* public : images for website


##Installation Guide


1. Follow the official installation guide on “https://www.meteor.com/install” to install Meteor
	* For OSX / Linux execute `>curl https://install.meteor.com/ | sh` from your terminal
	* For Windows download the installer from the url mentioned above.
2. Clone the GitHub repository from “https://github.com/mueller-andre/adaptivebank” or save the source files from the “adaptivebank” folder.
3. Open the “adaptivebank” folder in the terminal.
4. Execute the command `>meteor run` to start the application.
5. Open the URL “http://localhost:3000/“ inside a browser. 
	* Standard user: ‘123456789’ - password: ‘testtest’
	* Analyst user: ‘trainingAdmin’ - password: ‘trainingAdmin’
6. (Tests can be run by executing the command `>meteor test --driver-package=practicalmeteor:mocha --port 3100” and opening up “http://localhost:3100/` in a browser to view the results.)


Instructions can be added manually inside the “instructions.json” file that is stored inside “adaptivebank/private/instructions.json.” For changes to take effect, the Instructions collection must be removed inside MongoDB first and then the application must be restarted:
* Inside the “adaptivebank” folder, while the app is running, execute meteor mongo to start up the MongoDB client
* Execute `db.instructions.drop()` inside the client to delete the Instructions collection.
* Restart meteor to load up new “instructions.json” file.
