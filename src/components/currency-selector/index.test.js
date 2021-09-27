import React from 'react';
import renderer from 'react-test-renderer';

import CurrencySelector from './index';

it('renders CurrencySelector correctly ', () => {
  const tree = renderer.create(<CurrencySelector />).toJSON();
  expect(tree).toMatchSnapshot();
});