import {setupServer} from 'msw/node';

import {niaHandlers} from './handlers';

export const mswServer = setupServer(...niaHandlers);
