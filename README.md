# Roam-Inn

*Database Management Systems Final Project - Fall 2024*

## Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org).

- **MySQL**: Download the MySQL installer from its official page here: [MySQL Community Downloads](https://dev.mysql.com/downloads/)
   or directly access the [MySQL Installer for Windows](https://dev.mysql.com/downloads/installer/).

- **Python**: Get the latest Python version for your operating system from the [official Python download page](https://www.python.org/downloads/).

## Setup

1. **Clone the Repository**  
   To get started, clone the repository using its remote url:
   
   ```bash
   git clone https://github.com/Cognizaunce/Roam-Inn.git
   ```

## Backend Setup

1. **Navigate to the backend directory**
   ```bash
      cd roam-inn/backend
      ```

2. **Set up Database | Make sure you have database connection setup in MySQL and database name is "roaminn"**

   **1. Run the sql commands in the "Creating SQL.sql"  ---> in project directory**

   **2. Run the following commands in your terminal once database schema is initialized | Make sure to replace values according to your connection**
    ```bash
      export MYSQL_USER=your_username
      export MYSQL_PASSWORD=your_password
      export MYSQL_HOST=localhost
      export MYSQL_PORT=3306
      export MYSQL_DB=your_database_name
      ```

3. **Set up Python environment | make sure you have any Python 3 version installed**

   1. **Create your Python virtual environment**   
      ```bash
         python -m venv venv
         ```
      
   2. **Activate the virtual environment**
         **On Windows**
         ```bash
         .\venv\Scripts\activate
         ```
         **On macOS/Linux**
         ```bash
            source venv/bin/activate
         ```
      
   3. **Install Python Dependencies**
      ```bash
         pip install -r requirements.txt
      ```
      
   4. **Run the backend**
      ```bash
         uvicorn main:app --reload
      ```

## Frontend setup

1. **Navigate to the Project Directory**  
   After cloning, change into the project directory:
   
   ```bash
   cd roam-inn
   ```

2. **Install Dependencies**  
   Install the required Node.js modules by running the following commands:
   
   ```bash
   npm install create-react-app
   npm install react
   ```
   
   These commands will install `create-react-app` and `react`, which are required to run the application locally.

3. **Run the Application**  
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
- Only authorized users may push to `prod`


## To Run

- In the backend directory (`roam-inn/backend`):
  ```bash
  uvicorn main:app --reload
  ```

- In teh frontend directory (`roam-inn`):
  ```bash
  npm start
  ```
