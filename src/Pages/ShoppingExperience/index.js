import React from 'react';
import PropTypes from 'prop-types';
// Material-UI
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Components from '../../Components';
// -------
const { BezosHeader, MoneyLeftWrapper, Product, TradedItem } = Components;

// We export it for the unit tests.
export const BEZOS_NET_WORTH = 115500000000;

export class ShoppingExperienceRaw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moneyLeft: BEZOS_NET_WORTH,
      tradedItems: []
    };
  }

  onComputeMoneyLeft = () => {
    this.setState({
      moneyLeft: BEZOS_NET_WORTH - this.totalMoneySpent()
    });
  };

  onTradedItem = item => {
    const { tradedItems } = this.state;
    const index = tradedItems.findIndex(availableItem => availableItem.id === item.id);

    if (this.cannotFindItem(item)) {
      this.setState(
        {
          tradedItems: [...tradedItems, item]
        },
        this.onComputeMoneyLeft
      );
    } else if (this.itemAlreadyPurchased(item)) {
      this.setState(
        {
          tradedItems: [...tradedItems.slice(0, index), item, ...tradedItems.slice(index + 1)]
        },
        this.onComputeMoneyLeft
      );
    } else {
      this.setState(
        {
          tradedItems: [...tradedItems.slice(0, index), ...tradedItems.slice(index + 1)]
        },
        this.onComputeMoneyLeft
      );
    }
  };

  itemAlreadyPurchased = item => {
    return item.quantity !== 0;
  };

  totalMoneySpent = () => {
    const { tradedItems } = this.state;

    let totalMoneySpent = 0;
    for (let i = 0; i < tradedItems.length; i += 1) {
      totalMoneySpent += tradedItems[i].price * tradedItems[i].quantity;
    }
    return totalMoneySpent;
  };

  cannotFindItem(item) {
    const { tradedItems } = this.state;

    return tradedItems.findIndex(availableItem => availableItem.id === item.id) === -1;
  }

  render() {
    const { classes, lineItems } = this.props;
    const { moneyLeft, tradedItems } = this.state;

    return (
      <div className={classes.root}>
        <BezosHeader />
        <MoneyLeftWrapper moneyLeft={moneyLeft} />
        {/* Items */}
        <Grid container spacing={4}>
          {lineItems.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Product
                item={product}
                onTradedItem={this.onTradedItem}
              />
            </Grid>
          ))}
        </Grid>
        {/* Traded Items */}
        <Paper className={classes.paper}>
          <Grid container spacing={3} direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
              <Typography component="h3" variant="h5" align="center" color="textPrimary">
                Your Shopping Cart
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.fullWidth}>
              <Grid container>
                {tradedItems.map(tradedItem => (
                  <Grid item xs={12} sm={6} md={3} key={tradedItem.id}>
                    <TradedItem item={tradedItem} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

ShoppingExperienceRaw.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  lineItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles({})(ShoppingExperienceRaw);
