import { NguPaginationPage } from './app.po';

describe('ngu-pagination App', () => {
  let page: NguPaginationPage;

  beforeEach(() => {
    page = new NguPaginationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
