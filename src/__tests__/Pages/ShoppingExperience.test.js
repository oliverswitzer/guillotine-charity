import React from 'react';
import { mount } from 'enzyme';
import Button from '@material-ui/core/Button';
import { BEZOS_NET_WORTH, ShoppingExperienceRaw as ShoppingExperience } from '../../Pages/ShoppingExperience';
import Components from '../../Components';
import MoneyStringConverter from '../../Utils/MoneyStringConverter';

const { Product, TradedItem } = Components;

// Super hacky way of mocking the material-ui object styles:
// This is done like this because MainPage makes use of
// MoneyLeftWrapper and Product components which use a style object
// that requires the 'theme' object provided by material-ui.
// And to prevent the snapshot from exploding, we mock them like this.
jest.mock('../../Components/MoneyLeftWrapper/styles', () => ({}));
jest.mock('../../Components/Product/styles', () => ({}));

describe('ShoppingExperience Component', () => {
  let defaultProps;
  let mockLineItems;

  beforeEach(() => {
    mockLineItems = [
      {
        id: 1,
        name: 'dummy product 1',
        price: 1000,
        image: '/dummy/image/path'
      },
      {
        id: 2,
        name: 'dummy product 2',
        price: 1000,
        image: '/dummy/image/path'
      }
    ];

    defaultProps = {
      classes: {
        root: 'root-css',
        paper: 'paper-css'
      },
      lineItems: mockLineItems
    };
  });

  it('can buy multiple items', () => {
    const mainPageWrapper = mount(<ShoppingExperience {...defaultProps} />);

    expect(mainPageWrapper.find(TradedItem).length).toBe(0);

    const productComponentWrapper = mainPageWrapper.find(Product).first();
    buyFirstProduct(productComponentWrapper);
    buyFirstProduct(productComponentWrapper);

    const tradedItem = findTradedItem(mainPageWrapper, mockLineItems[0].name);

    expect(tradedItem.length).toBe(1);
    expect(tradedItem.props().item.quantity).toBe(2);
  });

  it('computes the remaining amount of money left for Jeff Bezos', () => {
    const mainPageWrapper = mount(<ShoppingExperience {...defaultProps} />);

    const productComponentWrapper = mainPageWrapper.find(Product).first();
    buyFirstProduct(productComponentWrapper);
    buyFirstProduct(productComponentWrapper);

    const totalCost = mockLineItems[0].price * 2;
    expect(
      mainPageWrapper.text()
    ).toContain(`$${MoneyStringConverter(BEZOS_NET_WORTH - totalCost)} Left`)
  });
});

// eslint-disable-next-line import/prefer-default-export
export function buyFirstProduct(productComponentWrapper) {
  productComponentWrapper.find(Button)
    .filterWhere(wrapper => wrapper.text() === 'Buy')
    .simulate('click');
}

export function findTradedItem(mainPageWrapper, tradedItemName) {
  return mainPageWrapper.find(TradedItem)
    .filterWhere(wrapper => wrapper.text().includes(tradedItemName));
}