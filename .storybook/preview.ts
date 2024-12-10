import type { Preview } from '@storybook/react';
import '@festo-ui/web-essentials/dist/css/festo-web-essentials.min.css';
import '@festo-ui/react/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
