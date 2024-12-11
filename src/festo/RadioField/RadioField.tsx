import { Radio, RadioGroup } from '@festo-ui/react';
import cls from 'classnames';

import './RadioField.scss';

export type RadioFieldProps = {
  title: string;
  options: { value: string; label: string }[];
  className?: string;
};

export default function RadioField({
  title,
  options,
  className,
}: RadioFieldProps) {
  return (
    <div className={cls('cs-radio-field', className)}>
      <div className="cs-radio-field-label fwe-mb-2">{title}</div>
      <RadioGroup>
        {options.map(({ value, label }) => (
          <Radio key={value} value={value}>
            {label}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
