import React from 'react';
import renderer from 'react-test-renderer';

import CurrencyOptions from './index';

it('renders CurrencyOptions correctly ', () => {
  const tree = renderer.create(<CurrencyOptions />).toJSON();
  expect(tree).toMatchSnapshot();
});