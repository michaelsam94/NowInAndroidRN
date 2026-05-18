import {API_BASE} from '../handlers';

describe('MSW NIA API handlers', () => {
  it('returns wrapped topics from GET /topics', async () => {
    const response = await fetch(`${API_BASE}/topics`);
    expect(response.ok).toBe(true);

    const body = (await response.json()) as {
      data: Array<{id: string; name: string}>;
    };
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]?.name).toBe('Compose');
  });

  it('returns wrapped news from GET /newsresources', async () => {
    const response = await fetch(`${API_BASE}/newsresources`);
    const body = (await response.json()) as {
      data: Array<{id: string; title: string}>;
    };
    expect(body.data[0]?.title).toContain('Compose');
  });
});
