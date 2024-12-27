import React from 'react';
import cn from 'classnames';
import { IconsMap, type IconName } from '../Icons';
import { ColorName } from '../Colors';

interface IconProps {
  name: IconName
  size?: string | number
  color?: ColorName
  className?: string
}

const Icon = ({ name, size = '5', color, className, ...props }: IconProps) => {
  const IconComp = IconsMap[name];

  if (!IconComp) {
    return null;
  }

  return (
    <IconComp
      className={cn(
        `h-${size} w-${size}`,
        color ? `text-${color}-500` : '',
        className
      )}
      {...props}
    />
  );
};

Object.entries(IconsMap).forEach(([name]) => {
  (Icon as IconComponent)[name as IconName] = (props: Omit<IconProps, 'name'>) => <Icon name={name as IconName} {...props} />;
});

type IconComponent = typeof Icon & {
  [K in IconName]: (props: Omit<IconProps, 'name'>) => React.JSX.Element;
};

const TypedIcon = Icon as IconComponent;

export {
  TypedIcon as Icon,
};