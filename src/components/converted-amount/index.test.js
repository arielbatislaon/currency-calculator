import React from 'react';
import renderer from 'react-test-renderer';

import ConvertedAmount from './index';

it('renders ConvertedAmount correctly ', () => {
  const tree = renderer.create(<ConvertedAmount />).toJSON();
  expect(tree).toMatchSnapshot();
});