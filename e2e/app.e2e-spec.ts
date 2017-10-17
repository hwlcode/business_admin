import { BusinessAdminPage } from './app.po';

describe('business-admin App', () => {
  let page: BusinessAdminPage;

  beforeEach(() => {
    page = new BusinessAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
