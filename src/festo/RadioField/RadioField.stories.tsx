import type { Meta, StoryObj } from '@storybook/react';
import RadioField from './RadioField';

const meta = {
  component: RadioField,
} satisfies Meta<typeof RadioField>;

export default meta;

type Story = StoryObj<typeof meta>;

const longOptions = [
  'Adobe PDF',
  'AutoCAD',
  'CATIA',
  'Creo',
  'EPLAN',
  'Inventor',
  'NX (Siemens)',
  'OneSpace Designer',
].map((item, idx) => ({ value: idx.toString(), label: item }));

export const Default: Story = {
  args: {
    title: 'Your CAD system',
    options: longOptions,
  },
};

export const Adjacent: Story = {
  args: {
    title: 'Level of detail',
    options: ['High', 'Low'].map((item, idx) => ({
      value: idx.toString(),
      label: item,
    })),
  },
  render: (args) => {
    return (
      <div className="fwe-p-2 fwe-p-sm-3 fwe-bg-white">
        <RadioField {...args} />
        <RadioField {...args} className="fwe-mt-6" />
      </div>
    );
  },
};

export const FourCols: Story = {
  args: {
    title: 'Your CAD system',
    options: longOptions,
  },
  render: (args) => {
    return (
      <div className="fwe-bg-gray-100 fwe-p-3 fwe-p-sm-4">
        <div className="fwe-grid">
          <div className="fwe-col-12 fwe-col-sm-6 fwe-col-md-3">
            <div className="fwe-p-2 fwe-p-sm-3 fwe-bg-white">
              <RadioField {...args} />
            </div>
          </div>
          <div className="fwe-col-12 fwe-col-sm-6 fwe-col-md-3">
            <div className="fwe-p-2 fwe-p-sm-3 fwe-bg-white">
              <RadioField {...args} />
            </div>
          </div>
          <div className="fwe-col-12 fwe-col-sm-6 fwe-col-md-3">
            <div className="fwe-p-2 fwe-p-sm-3 fwe-bg-white">
              <RadioField {...args} />
            </div>
          </div>
          <div className="fwe-col-12 fwe-col-sm-6 fwe-col-md-3">
            <div className="fwe-p-2 fwe-p-sm-3 fwe-bg-white">
              <RadioField {...args} />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
