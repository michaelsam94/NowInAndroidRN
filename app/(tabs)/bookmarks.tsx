import {BookmarksScreen, useBookmarksViewModel} from '@features/bookmarks';
import {defaultBookmarksDeps} from '@core/infrastructure/features/defaultFeatureDeps';

export default function BookmarksRoute() {
  const viewModel = useBookmarksViewModel(defaultBookmarksDeps());
  return <BookmarksScreen viewModel={viewModel} />;
}
