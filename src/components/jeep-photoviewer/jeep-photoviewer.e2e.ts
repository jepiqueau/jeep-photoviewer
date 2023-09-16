import { newE2EPage } from '@stencil/core/testing';

describe('jeep-photoviewer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-photoviewer></jeep-photoviewer>');
    const element = await page.find('jeep-photoviewer');
    expect(element).toHaveClass('hydrated');
  });

  it('renders should have a photoviewer-container and photoviewer-wrapper', async () => {
    const page = await newE2EPage();

    await page.setContent('<jeep-photoviewer></jeep-photoviewer>');
//    const component = await page.find('jeep-photoviewer');
    const container = await page.find('jeep-photoviewer >>> div');
    expect(container.className).toEqual(`photoviewer-container`);
    const wrapper = await container.find('div')
    expect(wrapper.className).toEqual(`wrapper`);
  });
});
