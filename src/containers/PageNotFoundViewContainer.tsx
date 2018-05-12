import * as React from 'react';
import { Link } from 'react-router-dom';

class PageNotFoundViewContainer extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="container">
        <div className="container season-not-found">
          <div className="d-flex w-100 mb-0">
            <h5 className="main-title">Page not found</h5>
          </div>
          <p className="lead">Something went wrong, perhaps some connection issue, try to select the year again <Link to="/">here</Link>.</p>
        </div>
      </div>
    );
  }
}

export default PageNotFoundViewContainer;