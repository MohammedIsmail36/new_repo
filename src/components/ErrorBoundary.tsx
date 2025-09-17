"use client";

import { Component, ReactNode } from 'react';
import { theme } from '@/lib/theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={theme.typography.heading_1}>حدث خطأ غير متوقع. يرجى تحديث الصفحة.</h1>;
    }
    return this.props.children;
  }
}