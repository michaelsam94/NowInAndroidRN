import {SearchScreen, useSearchViewModel} from '@features/search';
import {defaultSearchDeps} from '@core/infrastructure/features/defaultFeatureDeps';

export default function SearchRoute() {
  const viewModel = useSearchViewModel(defaultSearchDeps());
  return <SearchScreen viewModel={viewModel} />;
}
