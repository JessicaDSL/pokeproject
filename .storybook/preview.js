import React from 'react';
import { addDecorator } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import Global from '../src/styles/global'



export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  Story => (
    <>
      <Global />
      <Story />
    </>
  ),
];
addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)