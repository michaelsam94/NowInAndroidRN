import {createGetSearchContentsUseCase} from '../implementations/createGetSearchContentsUseCase';
import {onceObservable} from '../../../../../test/utils/observable';
import {
  TestSearchContentsRepository,
  TestUserDataRepository,
  emptyUserData,
} from '../../../../../test/fakes';
import {sampleNewsCompose} from '../../../../../test/fixtures/sampleNewsResources';
import {sampleTopicCompose} from '../../../../../test/fixtures/sampleTopics';

describe('GetSearchContentsUseCase', () => {
  it('maps search results with follow and bookmark state', async () => {
    const searchRepository = new TestSearchContentsRepository();
    const userDataRepository = new TestUserDataRepository();

    userDataRepository.setUserData({
      ...emptyUserData,
      followedTopics: new Set([sampleTopicCompose.id]),
      bookmarkedNewsResources: new Set([sampleNewsCompose.id]),
      bookmarkNotes: {[sampleNewsCompose.id]: 'Read later'},
    });

    searchRepository.setSearchResult('compose', {
      topics: [sampleTopicCompose],
      newsResources: [sampleNewsCompose],
    });

    const useCase = createGetSearchContentsUseCase(
      searchRepository,
      userDataRepository,
    );

    const result = await onceObservable(useCase.invoke('compose'));

    expect(result.topics).toEqual([
      {topic: sampleTopicCompose, isFollowed: true},
    ]);
    expect(result.newsResources[0]?.isSaved).toBe(true);
    expect(result.newsResources[0]?.note).toBe('Read later');
    expect(result.newsResources[0]?.followableTopics[0]?.isFollowed).toBe(
      true,
    );
  });
});
