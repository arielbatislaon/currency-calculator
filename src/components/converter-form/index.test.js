import React from 'react';
import renderer from 'react-test-renderer';

import ConverterForm from './index';

it('renders ConverterForm correctly ', () => {
  const tree = renderer.create(<ConverterForm />).toJSON();
  expect(tree).toMatchSnapshot();
});