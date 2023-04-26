
const { encrypt, incrementBytes, getKeyArraySize } = require('../src/index');

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

    test('Calling Encrypt with username:smartlink and pwd:00000000 should render="SbnWNQT+AEr3lwYrbwmjfA=="', () => {
        const username = 'smartlink';
        const password = '00000000';
        const encrypted = encrypt(username, password);
        expect(encrypted).toBe('SbnWNQT+AEr3lwYrbwmjfA==');
    });

    test('Calling Encrypt with username:smartlink and pwd:miXed@passw0rD0000 should render="SMkvr/3z57SLcGWCh3QrUw=="', () => {
        const username = 'smartlink';
        const password = 'miXed@passw0rD0000';
        const encrypted = encrypt(username, password);
        expect(encrypted).toBe('SMkvr/3z57SLcGWCh3QrUw==');
    });
});


