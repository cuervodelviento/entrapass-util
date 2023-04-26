# entrapass-util
This is a small package that contains the encryption method by the EntraPass SmartLink service where the login params need to be encrypted each time

# usage
You can do
const {encrypt} = require('entrapass-util');

it takes two atributes, a string and a encryption key

to login you can call

const input = {
    username: 'username',
    password: 'miXed@passw0rD0000',
    connectedProgram: 'a3533be0-4ba6-4d4c-82f6-cf3ebaaa6d86',
};
const output = getLoginParams(input);

Where output has
{
  encryptedUsername: 'A3k7n9ICwkD2zfMgLbULog==',
  encryptedPassword: '2RujkTtjViToyXR+3gU8uEbE9kCZrJxlqc7GS6nz7uY=',
  encryptedConnectedProgramUUID:
  'RdpRxdhK5m8TJrBudS10QGpq+n41aDDRra/mpFgnay2rPZLY+TP8wCItURGD4Z+MfzU5fThfka94UGMrfsg3jRBS5pyE54YKVe030UrCE6c=',
}

for you to use in your request, connectedProgram is an integration key that you have to get from https://connectedpartnerprogram.partnerproducts.com/
