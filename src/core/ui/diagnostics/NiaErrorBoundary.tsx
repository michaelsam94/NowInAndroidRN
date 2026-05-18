import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import {niaLog} from './logger';

interface NiaErrorBoundaryProps {
  readonly children: React.ReactNode;
  readonly label?: string;
}

interface NiaErrorBoundaryState {
  readonly error: Error | null;
}

export class NiaErrorBoundary extends React.Component<
  NiaErrorBoundaryProps,
  NiaErrorBoundaryState
> {
  state: NiaErrorBoundaryState = {error: null};

  static getDerivedStateFromError(error: Error): NiaErrorBoundaryState {
    return {error};
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    niaLog.error(
      `ErrorBoundary${this.props.label ? ` (${this.props.label})` : ''}`,
      {error, componentStack: info.componentStack},
    );
  }

  render(): React.ReactNode {
    const {error} = this.state;
    if (error === null) {
      return this.props.children;
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFBFE',
          padding: 24,
          justifyContent: 'center',
        }}
        testID="nia:error-boundary">
        <Text style={{color: '#B3261E', fontSize: 20, fontWeight: '700'}}>
          App error{this.props.label ? `: ${this.props.label}` : ''}
        </Text>
        <Text style={{color: '#1C1B1F', marginTop: 12, fontSize: 14}}>
          {error.name}: {error.message}
        </Text>
        <ScrollView style={{marginTop: 16, maxHeight: 320}}>
          <Text style={{color: '#49454F', fontSize: 12, fontFamily: 'monospace'}}>
            {error.stack ?? 'No stack trace'}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
