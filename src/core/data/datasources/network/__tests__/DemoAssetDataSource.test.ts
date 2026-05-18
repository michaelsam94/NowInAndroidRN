import {DemoAssetDataSource} from '../DemoAssetDataSource';

describe('DemoAssetDataSource', () => {
  it('returns demo topics and incremental change lists', async () => {
    const dataSource = new DemoAssetDataSource();

    const topics = await dataSource.getTopics();
    const changeList = await dataSource.getTopicChangeList(-1);

    expect(topics.length).toBeGreaterThan(0);
    expect(changeList.length).toBe(topics.length);
    expect(changeList[0]?.isDelete).toBe(false);
  });
});
