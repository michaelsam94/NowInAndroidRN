import {HttpResponse, http} from 'msw';

import type {NetworkResponse} from './fixtures';
import {sampleNetworkNews, sampleNetworkTopics} from './fixtures';

const API_BASE = 'https://niademo.example.com';

export const niaHandlers = [
  http.get(`${API_BASE}/topics`, () =>
    HttpResponse.json<NetworkResponse<typeof sampleNetworkTopics>>({
      data: sampleNetworkTopics,
    }),
  ),
  http.get(`${API_BASE}/newsresources`, () =>
    HttpResponse.json<NetworkResponse<typeof sampleNetworkNews>>({
      data: sampleNetworkNews,
    }),
  ),
  http.get(`${API_BASE}/changelists/topics`, () =>
    HttpResponse.json({data: []}),
  ),
  http.get(`${API_BASE}/changelists/newsresources`, () =>
    HttpResponse.json({data: []}),
  ),
];

export {API_BASE};
