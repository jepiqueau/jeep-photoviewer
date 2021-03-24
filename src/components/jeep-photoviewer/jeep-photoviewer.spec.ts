import { newSpecPage } from '@stencil/core/testing';
import { JeepPhotoviewer } from './jeep-photoviewer';

describe('jeep-photoviewer', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [JeepPhotoviewer],
      html: '<jeep-photoviewer></jeep-photoviewer>',
    });
    expect(root).toEqualHtml(`
      <jeep-photoviewer style="--gallery-box-width: 25.0000vw; --gallery-template-columns: auto auto auto auto;">
        <mock:shadow-root>
          <div class="photoviewer-container">
            <div class="wrapper">
            </div>
          </div>
        </mock:shadow-root>
      </jeep-photoviewer>
    `);
  });

});
