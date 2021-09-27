# SAC Frontend

## Develop with Docker

### With VS Code
  
Ensure that you have installed [Docker](https://docs.docker.com/install/) (with [Docker Compose](https://docs.docker.com/compose/install/)).  
Also, you need to have VS Code, "Docker" extension for VS Code and "Remote - Containers" extension for VS Code installed.  

- Open the frontend folder in VS Code.
- Click on the Remote Window ![image](https://user-images.githubusercontent.com/63697361/134866070-0582733a-9057-41e5-b842-587fbdae31f6.png) button and select "Reopen in Container" option.  
- Select the "From Dockerfile" option. This will build your frontend image using the configurations from the Dockerfile and open your VS Code folder inside it.
- Once everything is loaded, open a new terminal in VS Code. You can run your application commands now.  

### Without VS Code

- Run your docker containers by running the following from your root project directory:  
```
make dev-launch
```
- Or to run them in the background:  
```
make dev-launch-bg
```  

- Once the containers are up and running, run:
```
make ex-vue bash
```  
This will open a bash shell inside your vue docker container. Now you can use the pre-installed Vi text editor or install the editor of your choice by using the apk package manager.  
