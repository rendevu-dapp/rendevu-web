'use client';

// react
import { FC, JSX, PropsWithChildren } from 'react';
// next
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// imports
import { NavbarMenuItem } from '@heroui/react';

// helpers
import { classnames } from '@/common/helpers';

// types
import { IconProps } from '@/common/types/icon';

type MobileNavItemProps = PropsWithChildren<{
  href: string;
  icon?: (props: IconProps) => JSX.Element;
  iconProps?: IconProps;
}>;

const MobileNavItem: FC<MobileNavItemProps> = ({
  children,
  href,
  icon: Icon,
  iconProps,
}) => {
  // hooks
  const pathname = usePathname();

  // derived data
  const isActivePage = pathname === href;

  return (
    <NavbarMenuItem>
      <Link
        href={href}
        className={classnames(
          'w-full text-placeholder dark:text-text-primary-inverse flex items-center gap-3',
          {
            '!text-text-primary dark:!text-text-primary-inverse': isActivePage,
          }
        )}
      >
        {Icon && (
          <Icon
            size={24}
            fill={isActivePage ? '#181A1B' : '#868E96'}
            className={
              isActivePage
                ? 'dark:fill-text-primary-inverse'
                : 'dark:fill-text-secondary-inverse'
            }
            {...iconProps}
          />
        )}
        <span className="text-lg font-semibold">{children}</span>
      </Link>
    </NavbarMenuItem>
  );
};

export default MobileNavItem;
