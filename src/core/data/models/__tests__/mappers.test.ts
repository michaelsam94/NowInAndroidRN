import {mapNewsResourceDto, mapTopicDto} from '../mappers';

describe('mapNewsResourceDto', () => {
  it('deduplicates repeated topic ids on a news resource', () => {
    const topicsById = new Map([
      [
        '5',
        mapTopicDto({
          id: '5',
          name: 'Android Studio & Tools',
          shortDescription: '',
          longDescription: '',
          imageUrl: '',
          url: '',
        }),
      ],
    ]);

    const resource = mapNewsResourceDto(
      {
        id: '9',
        title: 'Test',
        content: 'Body',
        url: 'https://example.com',
        headerImageUrl: '',
        publishDate: '2022-10-06T23:00:00.000Z',
        type: 'Article',
        topics: ['5', '5'],
      },
      topicsById,
    );

    expect(resource.topics).toHaveLength(1);
    expect(resource.topics[0]?.id).toBe('5');
  });
});
