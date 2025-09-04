'use client';

// react
import { FC, JSX, PropsWithChildren } from 'react';
// next
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// imports
import { NavbarItem } from '@heroui/react';

// helpers
import { classnames } from '@/common/helpers';

// types
import { IconProps } from '@/common/types/icon';
type NavLinkProps = PropsWithChildren<{
  href: string;
  icon?: (props: IconProps) => JSX.Element;
  iconProps?: IconProps;
}>;

const NavLink: FC<NavLinkProps> = ({
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
    <NavbarItem>
      <Link
        href={href}
        className={classnames(
          'px-2.5 text-placeholder dark:text-text-primary-inverse flex items-center gap-1',
          {
            '!text-text-primary dark:!text-text-primary-inverse': isActivePage,
          }
        )}
      >
        {Icon && (
          <Icon
            size={18}
            fill={isActivePage ? '#868E96' : '#343A40'}
            className={classnames({
              'dark:fill-[#FFFFFF]': isActivePage,
              'dark:fill-text-secondary-inverse': !isActivePage,
            })}
            {...iconProps}
          />
        )}
        <span className="text-caption font-semibold">{children}</span>
      </Link>
    </NavbarItem>
  );
};

export default NavLink;
