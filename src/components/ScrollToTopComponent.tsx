import { Component } from "react";
import { withRouter } from "react-router";

class ScrollToTop extends Component<any, {}> {

  public componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  public render () {
    return this.props.children as any;
  }
}

export default withRouter(ScrollToTop)
