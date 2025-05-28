import { SNS } from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const sns = new SNS();

export const publishUserCreated = async (message: string) => {
  const params = {
    Message: message,
    TopicArn: process.env.SNS_TOPIC_ARN!,
  };

  try {
    const result = await sns.publish(params).promise();
    console.log('SNS publish result:', result);
    return result;
  } catch (err) {
    console.error('SNS publish error:', err);
    throw err;
  }
};
