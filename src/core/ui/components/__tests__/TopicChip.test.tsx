import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';

import {renderWithNiaTheme} from '../../../../../test/ui/renderWithNiaTheme';
import {sampleTopicCompose, sampleTopicKotlin} from '../../../../../test/fixtures/sampleTopics';
import {TopicChip} from '../TopicChip';

describe('TopicChip', () => {
  it('uses follow-state in accessibility label', () => {
    renderWithNiaTheme(
      <>
        <TopicChip
          followableTopic={{topic: sampleTopicCompose, isFollowed: true}}
          onPress={() => undefined}
        />
        <TopicChip
          followableTopic={{topic: sampleTopicKotlin, isFollowed: false}}
          onPress={() => undefined}
        />
      </>,
    );

    expect(screen.getByLabelText('Compose is followed')).toBeTruthy();
    expect(screen.getByLabelText('Kotlin is not followed')).toBeTruthy();
    expect(screen.getByText('COMPOSE')).toBeOnTheScreen();
  });

  it('invokes onPress with topic id', () => {
    const onPress = jest.fn();
    renderWithNiaTheme(
      <TopicChip
        followableTopic={{topic: sampleTopicCompose, isFollowed: false}}
        onPress={onPress}
      />,
    );

    fireEvent.press(screen.getByTestId(`topicTag:${sampleTopicCompose.id}`));
    expect(onPress).toHaveBeenCalledWith(sampleTopicCompose.id);
  });
});
