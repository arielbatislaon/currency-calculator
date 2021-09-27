import React from 'react';
import renderer from 'react-test-renderer';

import LoadingSpinner from './index';

it('renders LoadingSpinner correctly ', () => {
  const tree = renderer.create(<LoadingSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});