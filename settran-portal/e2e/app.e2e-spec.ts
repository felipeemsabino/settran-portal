import { SettranPortalPage } from './app.po';

describe('settran-portal App', () => {
  let page: SettranPortalPage;

  beforeEach(() => {
    page = new SettranPortalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
