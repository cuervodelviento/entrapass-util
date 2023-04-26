
const { encrypt, incrementBytes, getKeyArraySize, getLoginParams } = require('./index');

jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('0421cc35-ef84-4261-a6ea-86cb5dba9f12'),
}));

describe('EntraPass Encryption', () => {
    test('key array size should be 16', () => {
        const length = getKeyArraySize('00000000');
        expect(length).toBe(16);
    });

    test('key array size should be 24', () => {
        const length = getKeyArraySize('00000000111111112222');
        expect(length).toBe(24);
    });

    test('incrementBytes with byte input should increase each byte adding 1 and its current index ', () => {
        const encoder = new TextEncoder();
        const input = encoder.encode('00000000111111112222');
        const inputBytes = new Uint8Array([
            48, 48, 48, 48, 48, 48, 48, 48, 49, 49, 49, 49, 49, 49, 49, 49, 50, 50, 50, 50,
        ]);
        const outputBytes = new Uint8Array([
            49, 50, 51, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62, 63, 64, 65, 67, 68, 69, 70,
        ]);
        expect(input).toEqual(inputBytes);

        let output = incrementBytes(inputBytes);
        expect(output).toEqual(outputBytes);
        output = incrementBytes(input);
        expect(output).toEqual(outputBytes);
    });

    test('incrementBytes with encoded input should increase each byte adding 1 and its current index ', () => {
        const encoder = new TextEncoder();
        const input = encoder.encode('miXed@passw0rD');

        const outputBytes = new Uint8Array([
            110, 107, 91, 105, 105, 70, 119, 105, 124, 125, 130, 60, 127, 82,
        ]);

        const output = incrementBytes(input);
        expect(output).toEqual(outputBytes);
    });

    test('Calling Encrypt with username:smartlink and pwd:00000000 should render="wKm14Xc9HrPIuPU2NeaBdg=="', () => {
        const username = 'username';
        const password = 'wackypAssw0rd';
        const encrypted = encrypt(username, password);
        expect(encrypted).toBe('wKm14Xc9HrPIuPU2NeaBdg==');
    });

    test('Calling Encrypt with username:smartlink and pwd:miXed@passw0rD0000 should render="A3k7n9ICwkD2zfMgLbULog=="', () => {
        const username = 'username';
        const password = 'miXed@passw0rD0000';
        const encrypted = encrypt(username, password);
        expect(encrypted).toBe('A3k7n9ICwkD2zfMgLbULog==');
    });

    test('login params should be constructed properly using EntraPass Encryption', () => {
        const input = {
            username: 'username',
            password: 'miXed@passw0rD0000',
            connectedProgram: 'a3533be0-4ba6-4d4c-82f6-cf3ebaaa6d86',
        };


        const expectedOutput = {
            encryptedUsername: 'A3k7n9ICwkD2zfMgLbULog==',
            encryptedPassword: '2RujkTtjViToyXR+3gU8uEbE9kCZrJxlqc7GS6nz7uY=',
            encryptedConnectedProgramUUID:
                'RdpRxdhK5m8TJrBudS10QGpq+n41aDDRra/mpFgnay2rPZLY+TP8wCItURGD4Z+MfzU5fThfka94UGMrfsg3jRBS5pyE54YKVe030UrCE6c=',
        };

        const output = getLoginParams(input);
        expect(output).toEqual(expectedOutput);
    });
});


