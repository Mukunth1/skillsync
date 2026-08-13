import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b1311] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center text-xl font-bold text-[#f59e0b]">
            ⚡
          </div>
          <h1 className="text-xl font-extrabold">Skill Sync EdTech Application</h1>
          <p className="text-xs text-gray-400 max-w-sm">
            Display reset. Click below to continue your learning path.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
            }}
            className="px-5 py-2 rounded-xl bg-[#f59e0b] text-black font-bold text-xs hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            Reset View
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
