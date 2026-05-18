import React from 'react';
import {screen} from '@testing-library/react-native';

import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {ForYouScreen} from '../ForYouScreen';
import type {ForYouViewModelExtended} from '../../hooks/useForYouViewModel';

function createMockViewModel(
  overrides: Partial<ForYouViewModelExtended> = {},
): ForYouViewModelExtended {
  return {
    uiState: {
      feedState: 'Success',
      feed: [],
      isOnboarding: false,
      isSyncing: false,
      deepLinkedNewsId: null,
    },
    onboardingTopics: [],
    pendingBookmarkId: null,
    onTopicFollowClick: () => undefined,
    onOnboardingDone: () => undefined,
    onBookmarkClick: () => undefined,
    onNewsResourcePress: () => undefined,
    onDeepLinkConsumed: () => undefined,
    requestNotificationPermission: () => undefined,
    confirmPendingBookmark: () => undefined,
    dismissPendingBookmark: () => undefined,
    ...overrides,
  };
}

describe('ForYouScreen', () => {
  it('renders onboarding when isOnboarding is true', () => {
    renderWithNiaTheme(
      <ForYouScreen
        viewModel={createMockViewModel({
          uiState: {
            feedState: 'Empty',
            feed: [],
            isOnboarding: true,
            isSyncing: false,
            deepLinkedNewsId: null,
          },
        })}
      />,
    );

    expect(screen.getByTestId('foryou:onboarding')).toBeOnTheScreen();
    expect(screen.getByText('What are you interested in?')).toBeOnTheScreen();
  });

  it('renders empty feed state', () => {
    renderWithNiaTheme(
      <ForYouScreen
        viewModel={createMockViewModel({
          uiState: {
            feedState: 'Empty',
            feed: [],
            isOnboarding: false,
            isSyncing: false,
            deepLinkedNewsId: null,
          },
        })}
      />,
    );

    expect(screen.getByTestId('foryou:empty')).toBeOnTheScreen();
  });
});
