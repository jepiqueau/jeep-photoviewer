import { newE2EPage } from '@stencil/core/testing';

describe('jeep-photo-buttons', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-photo-buttons></jeep-photo-buttons>');
    const element = await page.find('jeep-photo-buttons');
    expect(element).toHaveClass('hydrated');
  });
});
