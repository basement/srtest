import { NglabPage } from './app.po';

describe('nglab App', () => {
  let page: NglabPage;

  beforeEach(() => {
    page = new NglabPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
