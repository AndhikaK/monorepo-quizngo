export const errorCodes = {
  '401001': 'Email or password invalid',
  '401002': 'Email already exist',

  '403001': 'Access denied',
  // Add more error codes as needed
} as const;

export type ErrorCode = keyof typeof errorCodes;
