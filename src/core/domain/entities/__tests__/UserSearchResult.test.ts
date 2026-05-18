import {mapToUserSearchResult} from '../UserSearchResult';
import {emptyUserData} from '../../../../../test/fakes/emptyUserData';
import {sampleNewsCompose} from '../../../../../test/fixtures/sampleNewsResources';
import {sampleTopicCompose} from '../../../../../test/fixtures/sampleTopics';

describe('mapToUserSearchResult', () => {
  it('joins topics and news with user bookmark and follow state', () => {
    const userData = {
      ...emptyUserData,
      followedTopics: new Set([sampleTopicCompose.id]),
      bookmarkedNewsResources: new Set([sampleNewsCompose.id]),
    };

    const result = mapToUserSearchResult(
      {
        topics: [sampleTopicCompose],
        newsResources: [sampleNewsCompose],
      },
      userData,
    );

    expect(result.topics[0]?.isFollowed).toBe(true);
    expect(result.newsResources[0]?.isSaved).toBe(true);
  });
});
