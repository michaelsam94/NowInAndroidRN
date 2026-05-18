import {useMemo} from 'react';

import {defaultBookmarksDeps} from '@core/infrastructure/features/defaultFeatureDeps';
import {BookmarksScreen, useBookmarksViewModel} from '@features/bookmarks';

export default function BookmarksRoute() {
  const deps = useMemo(() => defaultBookmarksDeps(), []);
  const viewModel = useBookmarksViewModel(deps);
  return <BookmarksScreen viewModel={viewModel} />;
}
