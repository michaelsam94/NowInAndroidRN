import React from 'react';
import {screen} from '@testing-library/react-native';

import {uiStrings} from '../../strings';
import {formatPublishDate} from '../../utils/formatPublishDate';
import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {
  sampleUserNewsEmptyType,
  sampleUserNewsRead,
  sampleUserNewsUnread,
  sampleUserNewsWithNote,
} from '../../../../../test/fixtures/sampleUserNewsResources';
import {NewsResourceCard} from '../NewsResourceCard';
import {NewsResourceTopicsRow} from '../newsResource/NewsResourceCardParts';

const noop = () => undefined;

describe('NewsResourceCard', () => {
  it('shows metadata with resource type', () => {
    renderWithNiaTheme(
      <NewsResourceCard
        userNewsResource={sampleUserNewsRead}
        isBookmarked={false}
        hasBeenViewed
        onToggleBookmark={noop}
        onPress={noop}
        onTopicPress={noop}
      />,
    );

    expect(
      screen.getByText(
        uiStrings.metadataWithType(
          formatPublishDate(sampleUserNewsRead.publishDate),
          sampleUserNewsRead.type,
        ),
      ),
    ).toBeOnTheScreen();
  });

  it('shows date only when resource type is empty', () => {
    renderWithNiaTheme(
      <NewsResourceCard
        userNewsResource={sampleUserNewsEmptyType}
        isBookmarked={false}
        hasBeenViewed
        onToggleBookmark={noop}
        onPress={noop}
        onTopicPress={noop}
      />,
    );

    expect(
      screen.getByText(formatPublishDate(sampleUserNewsEmptyType.publishDate)),
    ).toBeOnTheScreen();
  });

  it('does not render bookmark notes on the feed card', () => {
    renderWithNiaTheme(
      <NewsResourceCard
        userNewsResource={sampleUserNewsWithNote}
        isBookmarked
        hasBeenViewed
        onToggleBookmark={noop}
        onPress={noop}
        onTopicPress={noop}
      />,
    );

    expect(screen.queryByText('Hidden on feed cards')).toBeNull();
  });

  it('shows unread dot when article has not been viewed', () => {
    renderWithNiaTheme(
      <NewsResourceCard
        userNewsResource={sampleUserNewsUnread}
        isBookmarked={false}
        hasBeenViewed={false}
        onToggleBookmark={noop}
        onPress={noop}
        onTopicPress={noop}
      />,
    );

    expect(screen.getByLabelText(uiStrings.unreadDot)).toBeOnTheScreen();
  });

  it('hides unread dot when article has been viewed', () => {
    renderWithNiaTheme(
      <NewsResourceCard
        userNewsResource={sampleUserNewsRead}
        isBookmarked={false}
        hasBeenViewed
        onToggleBookmark={noop}
        onPress={noop}
        onTopicPress={noop}
      />,
    );

    expect(screen.queryByLabelText(uiStrings.unreadDot)).toBeNull();
  });
});

describe('NewsResourceTopicsRow', () => {
  it('renders topic chips with follow accessibility labels', () => {
    renderWithNiaTheme(
      <NewsResourceTopicsRow
        topics={sampleUserNewsWithNote.followableTopics}
        onTopicPress={noop}
      />,
    );

    expect(screen.getByLabelText('Compose is followed')).toBeTruthy();
    expect(screen.getByLabelText('Kotlin is not followed')).toBeTruthy();
  });
});
