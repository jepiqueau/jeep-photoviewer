import { newE2EPage } from '@stencil/core/testing';

describe('jeep-photo-hscroll', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-photo-hscroll></jeep-photo-hscroll>');
    const element = await page.find('jeep-photo-hscroll');
    expect(element).toHaveClass('hydrated');
  });
});
