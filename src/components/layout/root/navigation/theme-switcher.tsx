// imports
import type { SwitchProps } from '@heroui/react';
import { useSwitch, VisuallyHidden } from '@heroui/react';
import { useTheme } from '@/common/hooks/useTheme';

// icons
import { MoonIcon, SunIcon } from '@/components/icons';

const ThemeSwitcher = (props: SwitchProps) => {
  // hooks
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    ...props,
    isSelected: isDark,
    onChange: () => toggleTheme(isDark ? 'light' : 'dark'),
  });

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            'w-11 h-11',
            'py-4 px-1',
            'hidden md:flex md:items-center md:justify-center',
            'rounded-2xl bg-surfaces-bg-secondary hover:bg-default-200',
            'dark:bg-surfaces-bg-secondaryinverse dark:hover:bg-neutral-700',
          ],
        })}
      >
        {isSelected ? <SunIcon size={24} /> : <MoonIcon size={24} />}
      </div>
    </Component>
  );
};

export default ThemeSwitcher;
