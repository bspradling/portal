import React from 'react';
import { render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { msw } from '@backstage/test-utils';
import InformationTable from './InformationTable';

describe('ExampleFetchComponent', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  msw.setupDefaultHandlers(server);
  
  // setup mock response
  beforeEach(() => {
    server.use(rest.get('https://randomuser.me/*', (_, res, ctx) => res(ctx.status(200), ctx.delay(2000), ctx.json({}))))
  })
  it('should render', async () => {
    const rendered = render(<InformationTable data={[]} loading={false} columns={[]} title="Test"/>);
    expect(await rendered.findByTestId('progress')).toBeInTheDocument();
  });
});
