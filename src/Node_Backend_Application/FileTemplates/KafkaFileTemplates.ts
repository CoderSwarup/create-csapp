// Kafka Configuration Template
const KAFKA_CONFIG_TEMPLATE = `
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'your-app-name',
  brokers: ['localhost:9092'], // Change this to your Kafka broker addresses
});

export default kafka;
`;

// Kafka Producer Template
const KAFKA_PRODUCER_TEMPLATE = `
import kafka from '../config/index.js';
import { Producer } from 'kafkajs';

const producer = kafka.producer();

export const startProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

export const sendMessage = async (topic, message) => {
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
  console.log(\`Message sent to \${topic}: \${message}\`);
};

// Call this function to start the producer
startProducer();
`;

// Kafka Consumer Template
const KAFKA_CONSUMER_TEMPLATE = `
import kafka from '../config/index.js';
import { Consumer } from 'kafkajs';

const consumer = kafka.consumer({ groupId: 'your-group-id' });

export const startConsumer = async (topic) => {
  await consumer.connect();
  console.log('Kafka Consumer connected');

  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(\`Received message from \${topic} [\${partition}]: \${message.value.toString()}\`);
    },
  });
};

// Call this function to start the consumer
startConsumer('your-topic-name');
`;

// ******** TYPE SCRIPT        ***************

const KAFKA_PRODUCER_TEMPLATE_TYPESCRIPT = `
import kafka from '../config/index.js'
import { Producer } from 'kafkajs'

const producer = kafka.producer()

export const startProducer = async () => {
  await producer.connect()
  console.log('Kafka Producer connected')
}

export const sendMessage = async (topic: string, message: string) => {
  await producer.send({
    topic,
    messages: [{ value: message }],
  })
  console.log(\`Message sent to \${topic}\: \${message}\`)
}

// Call this function to start the producer
startProducer()


`;

const KAFKA_CONSUMER_TEMPLATE_TYPESCRIPT = `
import kafka from '../config/index.js'
import { Consumer } from 'kafkajs'

const consumer = kafka.consumer({ groupId: 'your-group-id' })

export const startConsumer = async (topic: string) => {
  await consumer.connect()
  console.log('Kafka Consumer connected')

  await consumer.subscribe({ topic })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        \`Received message from \${topic}\ [\${partition}\]: \${message.value?.toString()}\`,
      )
    },
  })
}

// Call this function to start the consumer
startConsumer('your-topic-name')

`;
export {
  KAFKA_CONFIG_TEMPLATE,
  KAFKA_PRODUCER_TEMPLATE,
  KAFKA_CONSUMER_TEMPLATE,
  KAFKA_PRODUCER_TEMPLATE_TYPESCRIPT,
  KAFKA_CONSUMER_TEMPLATE_TYPESCRIPT,
};
