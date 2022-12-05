import { newE2EPage } from '@stencil/core/testing';

describe('jeep-photo-zoom', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-photo-zoom></jeep-photo-zoom>');
    const element = await page.find('jeep-photo-zoom');
    expect(element).toHaveClass('hydrated');
  });
});
