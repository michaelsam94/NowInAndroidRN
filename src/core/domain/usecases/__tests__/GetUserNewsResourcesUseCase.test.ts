import {createGetUserNewsResourcesUseCase} from '../implementations/createGetUserNewsResourcesUseCase';
import {onceObservable} from '../../../../../test/utils/observable';
import {TestUserNewsResourceRepository} from '../../../../../test/fakes/TestUserNewsResourceRepository';
import {mapToUserNewsResource} from '../../entities/UserNewsResource';
import {sampleNewsCompose} from '../../../../../test/fixtures/sampleNewsResources';
import {emptyUserData, TestUserDataRepository} from '../../../../../test/fakes';

describe('GetUserNewsResourcesUseCase', () => {
  it('delegates to UserNewsResourceRepository streams', async () => {
    const repository = new TestUserNewsResourceRepository();
    const userDataRepository = new TestUserDataRepository();
    const userData = emptyUserData;
    const userNews = mapToUserNewsResource(sampleNewsCompose, userData);

    repository.setAll([userNews]);
    repository.setFollowed([userNews]);
    repository.setBookmarked([userNews]);

    const useCase = createGetUserNewsResourcesUseCase(repository);

    expect(await onceObservable(useCase.invoke())).toEqual([userNews]);
    expect(await onceObservable(useCase.observeForFollowedTopics())).toEqual([
      userNews,
    ]);
    expect(await onceObservable(useCase.observeBookmarked())).toEqual([userNews]);

    void userDataRepository;
  });
});
