import { newE2EPage } from '@stencil/core/testing';

describe('jeep-photo-share', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-photo-share></jeep-photo-share>');
    const element = await page.find('jeep-photo-share');
    expect(element).toHaveClass('hydrated');
  });
});
