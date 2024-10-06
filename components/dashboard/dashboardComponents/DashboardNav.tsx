'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu-ui';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/shadcn/avatar-ui';
import { Button } from '@/components/ui/shadcn/button-ui';
import { ChevronDown, Copy, Menu, X } from 'lucide-react'; // Changed to lucide-react icons
import { LogOut, Settings2, ListOrdered, EggFried } from 'lucide-react';
import { IconCurrencySolana } from '@tabler/icons-react';
import { useAuth } from '@/components/apollo/auth-context-provider'
const copyToClipboard = (text: any) => {
  navigator.clipboard.writeText(text);
  // You might want to add a toast notification here
};

export default function DashboardNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  const NavLinks = () => (
    <>
      <Link href="/overview" className="text-secondary">
        Overview
      </Link>
      <Link href="/marketplace" className="text-secondary">
        Marketplace
      </Link>
      <Link href="/about" className="text-secondary">
        About Us
      </Link>
      <Link href="/faq" className="text-secondary">
        FAQ
      </Link>
    </>
  );

  const UserDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Avatar>
              <AvatarImage src="/api/placeholder/64x64" alt="Profile picture" />
              <AvatarFallback>
                <div className="w-16 h-16 rounded-3xl dark:bg-white bg-black"></div>
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="text-secondary" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-72 p-4 bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-300 dark:border-zinc-700"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/api/placeholder/64x64" alt="Profile picture" />
              <AvatarFallback>
                <div className="w-16 h-16 rounded-3xl dark:bg-white bg-black"></div>
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl text-secondary font-semibold">Username</h2>
              <div className="text-gray-500 flex items-center">
                <span className="truncate mr-1">Wallet...address</span>
                <Copy
                  className="cursor-pointer"
                  onClick={() => copyToClipboard('Full wallet address here')}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-3xl">
            <div className="flex justify-between items-center">
              <div className="text-secondary">Buying power</div>
              <div className="text-xl text-secondary font-bold">$128.42</div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex-1 flex items-center gap-2 text-secondary">
                <div className="w-4 h-4 rounded-full bg-bg border border-solid border-[#D4D4D8]">
                  <IconCurrencySolana className="w-4 h-4" />
                </div>
                <span>0.1 SOL</span>
              </div>
              <div className="text-zinc-500">=$3.42</div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex-1 flex items-center gap-2 text-secondary">
                <div className="w-4 h-4 rounded-full bg-bg border border-solid border-[#D4D4D8]"></div>
                <span>124 USDC</span>
              </div>
              <div className="text-zinc-500">=$124</div>
            </div>
          </div>
          <DropdownMenuItem className="cursor-pointer text-secondary mt-4">
            <Settings2 className="mr-2 h-4 w-4" />
            <span className="text-sm font-semibold">Edit profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-secondary">
            <ListOrdered className="mr-2 h-4 w-4" />
            <span className="text-sm font-semibold">My orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-secondary">
            <EggFried className="mr-2 h-4 w-4" />
            <span className="text-sm font-semibold">Refer your friends</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem className="cursor-pointer text-secondary" 
             onSelect={(event) => {
              event.preventDefault();
              console.log("DropdownMenuItem selected");
            }}
          > */}
            <Button className="w-full mt-4" onClick={()=> {console.log('click')}} >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="text-sm font-semibold">Log**out</span>
            </Button>
          {/* </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <motion.header
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
      initial="hidden"
      animate="show"
      id="dashboard-navbar"
      className="flex items-center justify-between px-4 md:px-20 py-6 pt-10 bg-bg"
    >
      {/* Brand Logo */}
      <div className="flex items-center">
        <Image
          src="/logos/artisan-small-logo-white.svg"
          alt="Logo"
          width={32}
          height={32}
          className="cursor-pointer hidden dark:block"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <Image
          src="/logos/artisan-small-logo-black.svg"
          alt="Logo"
          width={32}
          height={32}
          className="cursor-pointer dark:hidden"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-primary md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      )}

      {/* Navigation Links */}
      <nav
        className={`${
          isMobile ? (mobileMenuOpen ? 'flex' : 'hidden') : 'flex'
        } ${
          isMobile
            ? 'flex-col absolute top-full left-0 right-0 bg-bg p-4'
            : 'items-center'
        } gap-6`}
      >
        {isMobile ? (
          <>
            <NavLinks />
            <UserDropdown />
          </>
        ) : (
          <>
            <NavLinks />
            <UserDropdown />
          </>
        )}
      </nav>
    </motion.header>
  );
}


