import '@testing-library/jest-native/extend-expect';

import {mswServer} from './msw/server';

beforeAll(() => {
  mswServer.listen({onUnhandledRequest: 'warn'});
});

afterEach(() => {
  mswServer.resetHandlers();
});

afterAll(() => {
  mswServer.close();
});
