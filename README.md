# Roam-Inn

*Database Management Systems Final Project - Fall 2024*

## Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org).

## Setup

1. **Clone the Repository**  
   To get started, clone the repository from your version control platform:
   
   ```bash
   git clone <repository_url>
   ```

## Backend Setup

1. **Navigate to the backend directory**
   ```bash
      cd roam-inn/backend
      ```

2. ## Setup Python environment | make sure you have any python 3 version installed

   1. **To set up the Python environment, run the following command**   
      ```bash
         python -m venv venv
         ```
      
   2. **To activate the Python environment run the following command(s)**
         **On Windows**
         ```bash
         .\venv\Scripts\activate
         ```
         **On macOS/Linux run the following command**
         ```bash
            source venv/bin/activate
         ```
      
   3. **Install Python Dependencies | Run the following command**
      ```bash
         pip install -r requirements.txt
      ```
      
   4. **Run the backend | Run the following command**
      ```bash
         uvicorn main:app --reload
      ```

## Frontend setup

1. **Navigate to the Project Directory**  
   After cloning, change into the project directory:
   
   ```bash
   cd roam-inn
   ```

3. **Install Dependencies**  
   Install the required Node.js modules by running the following commands:
   
   ```bash
   npm install create-react-app
   npm install react
   ```
   
   These commands will install `create-react-app` and `react`, which are required to run the application locally.

4. **Run the Application**  
   Once the dependencies are installed, the application is ready to run locally. Run the following command:

   ```bash
   npm start
   ```



## Branch Management

1. **Pull Latest Changes**  
   Always make sure your local branches are up to date before working on a new feature. Pull the latest changes from both the `prod` and `dev` branches:
   
   ```bash
   git pull origin prod
   git pull origin dev
   ```

2. **Create a Feature Branch**  
   To work on a new feature, create a branch off the `dev` branch:
   
   ```bash
   git checkout -b dev/my-feature
   ```
   
   Replace `my-feature` with a meaningful name that reflects the feature you're working on.

3. **Merge Changes**  
   Once your work is complete and tested, switch back to the `dev` branch and merge your feature branch:
   
   ```bash
   git checkout dev
   git merge dev/my-feature
   ```
   
   After merging, make sure to push the changes to the remote repository:
   
   ```bash
   git push origin dev
   ```

## Notes

- Ensure that your code is properly tested before merging to the `dev` branch.
- Only authorized users may push to prod


## To Run

in backend, uvicorn main:app --reload

in roaminn. npm start
