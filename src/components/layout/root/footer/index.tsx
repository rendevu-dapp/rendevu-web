'use client';

// next
import Link from 'next/link';

// icon components
import { ConditionsIcon, PrivacyIcon } from '@/components/icons';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#181A1B] py-4 px-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
      {/* logo, terms and privacy */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-2">
        {/* logo */}
        <Link
          href="/"
          className="relative bg-surfaces-bg-secondary dark:bg-[#1A1E22] py-3 px-6 border border-text-primary-inverse dark:border-text-primary rounded-2xl"
        >
          <h5 className="text-xl text-text-primary dark:text-text-primary-inverse font-bold font-bricolage-grotesque">
            rend.evu
          </h5>
        </Link>
        {/* terms and privacy */}
        <div className="bg-surfaces-bg-secondary dark:bg-[#343A40] p-1 flex flex-row items-center gap-1.5 rounded-2xl">
          <div className="bg-surfaces-bg-primary dark:bg-surfaces-bg-primaryinverse py-2.5 px-6 flex flex-row items-center gap-1.5 rounded-2xl">
            {/* terms */}
            <Link href="/terms" className="px-2.5 flex flex-row gap-1">
              <ConditionsIcon
                fill="#868E96"
                size={18}
                className="text-placeholder dark:text-text-primary-inverse"
              />
              <span className="text-caption text-placeholder dark:text-text-primary-inverse font-bricolage-grotesque font-semibold">
                Terms & Conditions
              </span>
            </Link>
            {/* privacy */}
            <Link href="/privacy" className="px-2.5 flex flex-row gap-1">
              <PrivacyIcon
                fill="#868E96"
                size={18}
                className="text-placeholder dark:text-text-primary-inverse"
              />
              <span className="text-caption text-placeholder dark:text-text-primary-inverse font-bricolage-grotesque font-semibold">
                Privacy Policy
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* company with copyright */}
      <div className="text-xs md:text-base text-neutral-500 dark:text-text-primary-inverse tracking-[-4%] font-medium md:font-bold">
        <span>
          © Rendevu (GH), {new Date().getFullYear()}. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
