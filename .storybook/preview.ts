import type { Preview } from '@storybook/react';

const customViewports = {
  xxl: {
    name: '1920',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  xl: {
    name: '1440',
    styles: {
      width: '1440px',
      height: '800px',
    },
  },
  md: {
    name: '1024',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  sm: {
    name: '768',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  xs: {
    name: '600',
    styles: {
      width: '600px',
      height: '667px',
    },
  },
  xxs: {
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
