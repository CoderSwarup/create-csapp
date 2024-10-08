# create_cspp

**`create_cspp`** is a powerful CLI tool designed to streamline the process of setting up both frontend (React) and backend (Node.js) applications. With a single command, you can generate the basic project structure and easily add common development features to your projects, including Redux, Axios, Tailwind, Socket.IO, Redis, Kafka, Prisma, Swagger, and GraphQL setup.

This tool is ideal for developers who want to kickstart their project with an optimal and scalable structure.

## Features

- **Frontend Creation (React)**: Quickly scaffold a basic React application.
- **Backend Creation (Node.js)**: Scaffold a backend project with Node.js and Express.
- **Add Popular Tools and Features**:
  - **Redux** for state management.
  - **Axios** for HTTP requests.
  - **TailwindCSS** for utility-first styling.
  - **Socket.IO** for real-time communication.
  - **Redis** for caching and messaging.
  - **Kafka** for event streaming.
  - **Prisma** for database ORM.
  - **Swagger** for API documentation.
  - **GraphQL** for API development.

## Installation

First, you need to install the package globally to make use of the CLI.

```bash
npm install -g create_cspp
```

OR Use using the `npx`

```bash
npm create_cspp
```

Once installed, you can use the `cspp` command to generate new applications or add features to existing projects.

## Usage

### Create a New Frontend Application (React)

To create a new React frontend application:

```bash
create_cspp frontend
```

This will scaffold a new React application with a basic project structure.

### Create a New Backend Application (Node.js)

To create a new Node.js backend application:

```bash
create_cspp backend
```

This will scaffold a new Node.js application with Express.js, complete with a basic project structure.

### Add Features to Your Application

You can also use `create_cspp` to easily add popular tools and features to your project.

```bash
create_cspp add <feature>
```

For example:

- Add **Redux** for state management:

  ```bash
  create_cspp add redux
  ```

- Add **Axios** for HTTP requests:

  ```bash
  create_cspp add axios
  ```

- Add **TailwindCSS** for styling:

  ```bash
  create_cspp add tailwind
  ```

- Add **Socket.IO** for WebSocket communication:

  ```bash
  create_cspp add socket-server
  ```

- Add **Redis** for caching and data persistence:

  ```bash
  create_cspp add redis-server
  ```

- Add **Kafka** for event-driven architecture:

  ```bash
  create_cspp add kafka-server
  ```

- Add **Prisma** ORM for database interaction:

  ```bash
  create_cspp add prisma
  ```

- Add **Swagger** for API documentation:

  ```bash
  create_cspp add swagger-api-doc
  ```

- Add **GraphQL** for building APIs:

  ```bash
  create_cspp add graphql-server
  ```

### Available Commands

- `create_cspp frontend`: Create a new frontend (React) application.
- `create_cspp backend`: Create a new backend (Node.js) application.
- `create_cspp add <feature>`: Add a feature to your project.

### List of Features

The following features are supported and can be added to your project:

| Feature             | Description                          |
| ------------------- | ------------------------------------ |
| **redux**           | Add Redux for state management       |
| **axios**           | Add Axios for making HTTP requests   |
| **tailwind**        | Add TailwindCSS for styling          |
| **socket-server**   | Add Socket.IO for real-time features |
| **redis-server**    | Add Redis for caching/data store     |
| **kafka-server**    | Add Kafka for message streaming      |
| **prisma**          | Add Prisma ORM for databases         |
| **swagger-api-doc** | Add Swagger for API documentation    |
| **graphql-server**  | Add GraphQL for API development      |

### Help

You can use the `--help` flag to get more information about the available commands:

```bash
cspp --help
```

## Contributing

We welcome contributions! If you would like to contribute, please submit a pull request or open an issue on our GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
