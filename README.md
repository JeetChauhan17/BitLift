# BitLift -  Your go-to platform for effortless and  smooth project deployment

BitLift is a powerful platform that simplifies the process of deploying and hosting websites, giving you the tools you need to effortlessly launch your projects. BitLift allows you to store your website's repository contents on a cloud bucket and then seamlessly deploy and host your website with ease.

## Features

- **Effortless Deployment**: BitLift streamlines the deployment process, making it easy to deploy your website in just a few clicks.
  
- **Automatic Hosting**: Once deployed, your website is automatically hosted, ensuring that it's always accessible to your audience.
  
- **Cloud Storage Integration**: BitLift seamlessly integrates with cloud storage solutions, allowing you to store your website's repository contents securely.
  
- **Easy To Use**: Just paste your project's GitHub repository link and Viola! your website will be up and runnning in a couple of minutes.
  
- **Custom Domain Support**: Easily connect your custom domain to your BitLift deployment, giving your website a professional and custom appearance.

## Getting Started

To get started with BitLift, follow these simple steps:

1. **Sign Up**: Create an account on BitLift and log in to the platform.

2. **Connect Your Repository**: Connect your GitHub repository to BitLift to enable automatic deployment.

3. **Configure Deployment Settings**: Customize your deployment settings, including choosing your cloud storage provider and configuring your custom domain.

4. **Deploy Your Website**: Just click the generated link once the deployment process is done and you are ready to go!


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine (recommended version: x.x.x)
- [npm](https://www.npmjs.com/) (Node Package Manager) installed
- [Git](https://git-scm.com/) installed
- [Redis](https://redis.io/) installed and running on your machine

### Cloning the Repository

  ```git clone https://github.com/JeetChauhan17/BitLift.git```
  
  ```cd BitLift```

### Frontend Setup

1. Navigate to the frontend folder:

  ```cd frontend```

2. Install dependencies:

  ```npm install```

3. Build the React application:

  ```npm run build```

### Backend Services Setup

#### Vercel

1. Navigate to the vercel folder:

  ```cd vercel```

2. Install dependencies:

  ```npm install express @types/express redis aws-sdk simple-git cors```

3. Build the TypeScript files:

  ```npx tsc -b```

4. Start the Vercel deployment service:

  ```node dist/index.js```

#### Vercel Deploy Service

1. Navigate to the vercel-deploy-service folder:

  ```cd vercel-deploy-service```

2. Install dependencies:

  ```npm install```

3. Build the TypeScript files:

  ```npx tsc -b```

4. Start the Vercel deploy service:

  ```node dist/index.js```

#### Vercel Request Handler

1. Navigate to the vercel-request-handler folder:

  ```cd vercel-request-handler```

2. Install dependencies:

  ```npm install```

3. Build the TypeScript files:

  ```npx tsc -b```

4. Start the Vercel request handler:

  ```node dist/index.js```

### Running the Application

Once all services are set up and running, you can access the frontend application in your browser at the link provided by the frontend in console.

### Running Redis Server

Before running the backend services, make sure Redis is installed and running on your machine. If not, you can download and install it from Redis.io.

Once Redis is installed, start the Redis server:

```redis-server```
```https://developer.redis.com/create/windows/```

## Contributing

Contributions are welcome! Please feel free to fork this repository, make changes, and submit pull requests.

## License

This project is licensed under the MIT License.


                                            
