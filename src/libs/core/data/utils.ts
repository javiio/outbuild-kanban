import { serverTimestamp, type Timestamp } from 'firebase/firestore';

// Created this just to have a better naming in docs' ids, to make it easier to find them during development
export const uid = (seed?: string) => {
  const sanitizedSeed = seed
    ? `${seed.substring(0, 11)}` // Take the first 11 characters if available
        .replace(/[^a-zA-Z0-9 ]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
    : '';

  const a = sanitizedSeed ? `${sanitizedSeed}-` : '';
  const b = Math.floor(Math.random() * Date.now()).toString(16);
  return `${a}${b}`;
};

export const now = () => {
  return serverTimestamp() as Timestamp
};
