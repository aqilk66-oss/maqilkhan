import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 my-4 rounded-2xl bg-navy-900 border border-red-500/30 text-slate-200">
          <p className="text-sm font-mono text-red-400 mb-2">Component display notice</p>
          <p className="text-xs text-slate-400">Content will reload on next refresh.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
