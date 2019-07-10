import React from 'react';
import { Link } from 'react-router-dom';

import './AppBar.scss';

const AppBar = (props) => (
  <div className='appbar'>
    <Link to="/">
      <div className='appbar-title'>Income Tracker</div>
    </Link>
  </div>
);

export default AppBar;