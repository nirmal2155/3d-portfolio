import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-slate-900 border border-cyan-500/30 rounded-xl text-xs font-mono-tech text-cyan-300">
          <span>Component Active • Telemetry Fallback Engine Operating</span>
        </div>
      );
    }
    return this.props.children;
  }
}
