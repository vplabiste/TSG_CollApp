
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onLoginClick?: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  const router = useRouter();

  const handleLoginNav = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      if (window.location.pathname === '/') {
         const loginSection = document.getElementById('login-section');
         loginSection?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/#login-section'); 
      }
    }
  };
  
  const handleSignupNav = () => {
    router.push('/signup');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative mx-auto flex h-16 max-w-screen-2xl items-center px-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="flex items-center gap-2" aria-label="COLLAPP Home">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-semibold text-primary">COLLAPP</span>
          </Link>
        </div>

        <div className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-x-2">
          <Button onClick={handleLoginNav} variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Login
          </Button>
          <Button onClick={handleSignupNav} variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
