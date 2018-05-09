import * as React from 'react';

class LoadingComponent extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="loading">
        <div className="loading-car"/>
        <div className="loading-text">
          Loading<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span>
        </div>
      </div>
    );
  }
}

export default LoadingComponent;