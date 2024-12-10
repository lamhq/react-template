import type { Preview } from '@storybook/react';
import '@festo-ui/web-essentials/dist/css/festo-web-essentials.min.css';
import '@festo-ui/react/index.css';

const customViewports = {
  xl: {
    name: '1920',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  l: {
    name: '1440',
    styles: {
      width: '1440px',
      height: '800px',
    },
  },
  m: {
    name: '1024',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  s: {
    name: '768',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  xs: {
    name: '375',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: customViewports,
    },
  },
};

export default preview;
