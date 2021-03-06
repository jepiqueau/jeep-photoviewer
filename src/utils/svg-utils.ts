
const btoa = (b: string) => window.btoa(b);

const shareSVG: string = "<svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-share-2'><circle cx='18' cy='5' r='3'></circle><circle cx='6' cy='12' r='3'></circle><circle cx='18' cy='19' r='3'></circle><line x1='8.59' y1='13.51' x2='15.42' y2='17.49'></line><line x1='15.41' y1='6.51' x2='8.59' y2='10.49'></line></svg>";
const closeSVG: string = "<svg xmlns='http://www.w3.org/2000/svg'   viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-x'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg>";
const minimizeSVG: string = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-minimize'><path d='M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3'></path></svg>";
const fullscreenSVG: string = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-maximize'><path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'></path></svg>";
const placeholderSVG: string =`<svg id='No_Image' data-name='No_Image' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'>
<rect x='50' y='70' width='140' height='140' rx='20' ry='20' fill='#3700B3' mask='url(#hole)'/>
<mask id='hole'>
    <rect x='50' y='70' width='140' height='140'  rx='20' ry='20' fill='#b49393'/>
    <path d='M70 190,H170,L135 100,L110 150,L92.5 130 z' stroke='red' fill='#3700B3'></path>
</mask>
</svg>
`;
export const shareUrl: string = "url('data:image/svg+xml;base64," + btoa(shareSVG) + "')";
export const closeUrl: string = "url('data:image/svg+xml;base64," + btoa(closeSVG) + "')";
export const minimizeUrl: string = "url('data:image/svg+xml;base64," + btoa(minimizeSVG) + "')";
export const fullscreenUrl: string = "url('data:image/svg+xml;base64," + btoa(fullscreenSVG) + "')";
export const placeholderUrl: string = "url('data:image/svg+xml;base64," + btoa(placeholderSVG) + "')";
