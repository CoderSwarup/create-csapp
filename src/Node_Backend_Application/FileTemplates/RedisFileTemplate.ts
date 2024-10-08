// Redis Configuration Template
export const REDIS_CONFIG_TEMPLATE = `
import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379', // Change this to your Redis server URL
});

client.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
  await client.connect();
  console.log('Redis Client connected');
};

export default client;
`;
