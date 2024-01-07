# Node Authentication API

This is a Node.js server application serving as a REST API with authentication, built using TypeScript, Docker, and MongoDB. It's structured to provide a robust development environment with hot reloading and an efficient production setup.

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker (https://www.docker.com/)
- Docker Compose (https://docs.docker.com/compose/)
- Node.js (https://nodejs.org/)
- Yarn (https://yarnpkg.com/) (Optional, but preferred)

## Getting Started

To get the project up and running on your local machine for development and testing purposes, follow these steps.

### Clone the Repository

To clone the repository and navigate into the directory, execute:
git clone git@github.com:Devin-GPT/node-auth.git
cd node-auth

### Development Environment Setup

1. Start the Application:
   Using Docker Compose, build and start the services by running:
   docker-compose up --build
   This command builds the Docker image for the application and starts the services defined in the docker-compose.yml file, including the MongoDB database and the Node.js application with hot reloading enabled.

2. Access the Application:
   Once the services are up and running, you can access the API at http://localhost:3330.

3. Making Changes:
   Any changes made to the TypeScript files in the src directory will be automatically detected by Nodemon, and the application will be recompiled and restarted in the Docker container.

### Production Environment

For deploying the application in a production environment, ensure you modify the Dockerfile and scripts to align with production best practices.

### Running Tests

Explain how to run the automated tests for this system (if applicable).

## Built With

- Node.js (https://nodejs.org/) - The JavaScript runtime
- TypeScript (https://www.typescriptlang.org/) - The programming language
- Docker (https://www.docker.com/) - Containerization platform
- MongoDB (https://www.mongodb.com/) - Database

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use SemVer (http://semver.org/) for versioning. For the versions available, see the tags on this repository (https://github.com/Devin-GPT/node-auth/tags).

## Authors

- Devin Dias - Initial work - Devin-GPT (https://github.com/Devin-GPT)

See also the list of contributors (https://github.com/Devin-GPT/node-auth/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
