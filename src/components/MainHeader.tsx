import * as React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../static/logoMobF1.png';

export default class MainHeader extends React.Component<{}, {}> {
  public render(){
    return (
      <header className="main-header">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <Link className="navbar-brand" to="/">
            <img src={logoImg} alt="Mobiquity F1"/>
          </Link>
        </nav>
      </header>
    );
  }
}
  