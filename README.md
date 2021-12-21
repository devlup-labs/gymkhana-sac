# Student Activity Council IITJ

## Run Using Docker
Ensure that you have installed [Docker](https://docs.docker.com/install/) (with [Docker Compose](https://docs.docker.com/compose/install/)).  
- Build the images
```
cd <project-directory>
make build
```  
Run the containers:
```
make dev-launch
```
To run the containers in the background:  
```
make dev-launch-bg
```

After executing `make dev-launch` or `make dev-launch-bg`, you will be running:
* The application (frontend) on http://localhost:8080 
* The API Server (backend) on http://localhost:8000  

## Run Without Docker  

### Setup Frontend

If you haven't already, install the vue-cli service:  
`npm install -g @vue/cli @vue/cli-service-global`

Then follow these steps:
```
git clone https://github.com/devlup-labs/gymkhana-sac
cd <project-directory>/frontend/  
npm install
```
- Compiles and hot-reloads for development
```
npm run serve
```

- Compiles and minifies for production
```
npm run build
```

- Lints and fixes files
```
npm run lint
```

### Setup Backend

Make sure you have python 3.6 and pipenv installed on your pc.

Then follow these steps:
```
cd <project-directory>/
cp .env.example .env
```  
```
cd <project-directory>/backend/
pipenv --python 3.6 install --dev
```

- Activate the new virtual environment:
```
pipenv shell
```  
- Make database migrations
```
python manage.py makemigrations
python manage.py migrate
```  
- Create a superuser
```
python manage.py createsuperuser
```  
- Run development server on localhost
```
python manage.py runserver
```  
#### Dummy Data for Testing [OPTIONAL]:  
This will populate the database with random values for testing:
```
python manage.py createfixture 
```  
