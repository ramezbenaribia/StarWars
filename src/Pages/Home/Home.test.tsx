import { describe, expect, it } from 'vitest'
import { render, screen } from '../../utils/test-utils'



// import { rest } from "msw";
// import { setupServer } from "msw/node";

// import { server } from "../../mocks/server";

// // import ReactDOM, { render } from 'react-dom';
// import { createRoot } from 'react-dom/client';
import Home from "./Home";
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())


describe("Home Page tests", () => {

  it("the table should have an item with the name 'Star Wars Test' ", async () => {
    localStorage.setItem("page", "1");

    render(
      <BrowserRouter>
        <IntlProvider locale={'de-DE'} >
          <Home />
        </IntlProvider>
      </BrowserRouter>
    );

    const starship = await screen.findByText("Name1");
    expect(starship).toBeVisible();
  });
})
