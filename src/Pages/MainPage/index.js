import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Material-UI
import { withStyles } from '@material-ui/styles';
import Switch from '@material-ui/core/Switch';
import styles from './styles';
import ShoppingExperience from '../ShoppingExperience';
import Products from '../../Data/Products';
import Charities from '../../Data/Charities';

// We export it for the unit tests.
export const BEZOS_NET_WORTH = 115500000000;

export const MainPageRaw = ({ classes }) => {
  const [guillotineMode, setGuillotineMode] = useState(false);
  const lineItems = guillotineMode ? Charities : Products;
  return (
    <div>
      <>
        Blind Consumerism Mode
        <Switch
          checked={guillotineMode}
          onChange={() => {
            setGuillotineMode(!guillotineMode)
          }}
          value="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        Guillotine Mode

        <ShoppingExperience
          lineItems={lineItems}
          classes={classes}
        />
      </>
    </div>
  );
};

MainPageRaw.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(MainPageRaw);
