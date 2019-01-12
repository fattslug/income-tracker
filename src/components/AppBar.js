import React from 'react';
import { Box, ResponsiveContext } from 'grommet';

const AppBar = (props) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={
          {
            left: size === 'small' ? 'large' : 'medium',
            right: 'small',
            vertical: size === 'small' ? 'medium' : 'small'
          }
        }
        elevation='medium'
        style={{ zIndex: '1' }}
        {...props}
      />
    )}
  </ResponsiveContext.Consumer>
);

export default AppBar;