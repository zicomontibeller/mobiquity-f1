import * as React from 'react';

import { DriversModel } from '../models/DriversModel';
import "flag-icon-css/sass/flag-icon.scss";

interface DriverValueProps{
  driver: DriversModel
}
class DriverGridItem extends React.Component<DriverValueProps, {}> {
  public render() {
    const { driver } = this.props;
    const driverImg = require(`../static/img/drivers/${driver.driverId}.jpg`);
    return (
      <div className="row driver-grid-item">
        <div className="col col-12 col-lg-6">
          <div className="driver-picture text-hide" style={{ backgroundImage: `url(${driverImg})` }}>
            { `${driver.givenName} ${driver.familyName}` }
          </div>
        </div>
        <div className="col col-12 col-lg-6 driver-info">
          <p className="m-0"><strong>Name</strong></p>
          <p className="m-0">{ `${driver.givenName} ${driver.familyName}` } <span title={driver.nationality} className={`flag-icon flag-icon-${driver.nationalityShort}`}/></p>
          <p className="m-0"><strong>Constructor</strong></p>
          <p className="m-0">{ driver.constructorName }</p>
        </div>
      </div>
    )
  }
}

export default DriverGridItem;