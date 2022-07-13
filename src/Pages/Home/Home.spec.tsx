import { describe, expect, it } from 'vitest'
import { render, screen, waitForElementToBeRemoved } from '../../utils/test-utils'
import Home from "./Home";
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { handlers } from '../../mocks/handlers';

import { setupServer } from 'msw/node'
import { MySwrConfig } from './MySwrConfig';

const server = setupServer(...handlers);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Home Page tests", () => {


  beforeEach(async () => {
    localStorage.setItem("page", "1");

    render(
      <BrowserRouter>
        <IntlProvider locale={'de-DE'} >
          <MySwrConfig swrConfig={{ dedupingInterval: 0, provider: () => new Map() }}>
            <Home />
          </MySwrConfig>
        </IntlProvider>
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  });

  it("the table should have an item with the name 'Star Wars Test' ", async () => {
    const firstRowName = await screen.findByText("Star Wars Test");
    expect(firstRowName).toBeVisible();
  });

})



