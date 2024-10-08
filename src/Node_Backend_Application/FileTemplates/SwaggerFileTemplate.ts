export const SWAGGER_TEMPLATE = `
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml'; // Ensure YAML is imported
import routeFiles from './routeFile.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
  },
  apis: routeFiles, // Path to the API docs
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(options);

// Setup Swagger UI
export const setupSwagger = (app) => {
  // Use the correct relative path to swagger.yaml
  const filePath = path.join(__dirname, 'swagger.yaml');
  
  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, 'utf8');
    const swaggerDocument = YAML.parse(file);

    // Use Swagger UI middleware
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } else {
    console.error('❌ swagger.yaml file not found at:', filePath);
  }
};

// Export the generated swagger specification if needed
export { swaggerSpec };

`;

export const ROUTE_FILE_TEMPLATE = `
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const getRouteFiles = (folderPath) => {
  const routeFiles = fs.readdirSync(path.resolve(path.join(folderPath)))
  return routeFiles.map((file) => path.join(folderPath, file))
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const routeFiles = getRouteFiles(path.join(__dirname, '../routes'))
export default routeFiles
`;

export const SWAGGER_YAML_TEMPLATE = `
openapi: 3.0.0
info:
  title: Your API Title
  version: 1.0.0
  description: API documentation for your application
servers:
  - url: 'http://localhost:3000/api/v1'  #Adjust your URL
paths:
  /healthcheck:
    get:
      summary: Health Check Route
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: 'success'
`;

//**************************************** TYPE SCRIPT */

export const SWAGGER_TEMPLATE_TYPESCRIPT = `
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import YAML from 'yaml' // Ensure YAML is imported
import routeFiles from './routeFile.js'
import { fileURLToPath } from 'url'
import { Application } from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
  },
  apis: routeFiles, // Path to the API docs
}

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(options)
const resolveProjectRoot = () => path.resolve(__dirname, '..', '..')
const copySwaggerFile = () => {
  const projectRoot = resolveProjectRoot() // Resolve to project root (two levels above 'dist')
  const sourcePath = path.join(
    projectRoot,
    'src',
    'SwaggerAPIDoc',
    'swagger.yaml',
  )
  const destinationPath = path.join(__dirname, 'swagger.yaml')

  try {
    // Create the destination folder if it doesn't exist
    const destinationDir = path.dirname(destinationPath)
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true })
    }

    // Copy the file
    fs.copyFileSync(sourcePath, destinationPath)
  } catch (err) {
    console.error('❌ Error copying swagger.yaml file:', err)
  }
}
// Setup Swagger UI
export const setupSwagger = (app: Application) => {
  // Use the correct relative path to swagger.yaml
  copySwaggerFile()
  const filePath = path.join(__dirname, 'swagger.yaml')

  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, 'utf8')
    const swaggerDocument = YAML.parse(file)

    // Use Swagger UI middleware
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  } else {
    console.error('❌ swagger.yaml file not found at:', filePath)
  }
}

// Export the generated swagger specification if needed
export { swaggerSpec }
`;
export const ROUTE_FILE_TEMPLATE_TYPESCRIPT = `
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const getRouteFiles = (folderPath: string) => {
  const routeFiles = fs.readdirSync(path.resolve(path.join(folderPath)))
  return routeFiles.map((file) => path.join(folderPath, file))
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const routeFiles = getRouteFiles(path.join(__dirname, '../routes'))
export default routeFiles
`;
