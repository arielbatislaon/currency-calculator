import React from 'react';
import renderer from 'react-test-renderer';

import CurrencyAmount from './index';

it('renders CurrencyAmount correctly ', () => {
  const tree = renderer.create(<CurrencyAmount />).toJSON();
  expect(tree).toMatchSnapshot();
});