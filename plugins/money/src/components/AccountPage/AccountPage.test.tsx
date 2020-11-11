import React from 'react';
import { render } from '@testing-library/react';
import AccountPage from './AccountPage';
import { ThemeProvider } from '@material-ui/core';
import { lightTheme } from '@backstage/theme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { msw } from '@backstage/test-utils';


describe('AccountPage', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  msw.setupDefaultHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))))
  })

  it('should render', () => {
    const rendered = render(
      <ThemeProvider theme={lightTheme}>
        <AccountPage />
      </ThemeProvider>,
      );
      expect(rendered.getByText('Welcome to money!')).toBeInTheDocument();
  });
});
