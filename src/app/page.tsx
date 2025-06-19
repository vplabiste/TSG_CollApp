
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { useRouter } from 'next/navigation';

const universityData = [
  {
    title: 'Cebu Institute of Technology - University',
    description: 'A leading technological university in Cebu City, offering a wide range of engineering, IT, and business programs.',
    image: '/images/logos/citu-logo.png',
    aiHint: 'CIT U logo',
    url: 'https://cit.edu/',
  },
  {
    title: 'University of San Carlos',
    description: 'A prestigious Catholic university known for its strong academic programs in liberal arts, sciences, and law.',
    image: '/images/logos/usc-logo.png',
    aiHint: 'USC Cebu logo',
    url: 'https://www.usc.edu.ph/',
  },
  {
    title: 'University of San Jose - Recoletos',
    description: 'A prominent institution offering diverse courses in education, business, engineering, and arts.',
    image: '/images/logos/usjr-logo.png',
    aiHint: 'USJR logo',
    url: 'https://usjr.edu.ph/',
  },
];

export default function HomePage() {
  const loginSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLoginClick = () => {
    loginSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSignupClick = () => {
    router.push('/signup');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header onLoginClick={handleLoginClick} />
      <main className="flex-grow">
        <section className="relative py-20 md:py-32 text-center bg-background">
                  <div className="absolute inset-0 opacity-4" style={{ backgroundImage: "url('/images/cambridge.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="container relative mx-auto px-4">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Connect Your Future with COLLAPP
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-foreground/80">
              COLLAPP makes college applications seamless for students and school representatives. Discover, apply, and manage with ease.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" onClick={handleSignupClick} className="shadow-md hover:shadow-lg transition-shadow">
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" onClick={handleLoginClick} className="shadow-md hover:shadow-lg transition-shadow">
                Login <span aria-hidden="true" className="ml-1.5">&rarr;</span>
              </Button>
            </div>
          </div>
        </section>

        <section id="universities-section" className="py-16 sm:py-24 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Featured Universities
              </h2>
              <p className="mt-4 text-lg text-foreground/70">
                Explore and apply to these renowned institutions through COLLAPP.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {universityData.map((uni, index) => (
                <Link key={index} href={uni.url} target="_blank" rel="noopener noreferrer" className="block hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary rounded-xl">
                  <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground border-border">
                    <div className="relative h-48 w-full bg-card-foreground/5 p-4">
                      <Image src={uni.image} alt={`${uni.title} logo`} layout="fill" objectFit="contain" data-ai-hint={uni.aiHint} />
                    </div>
                    <CardHeader className="text-center">
                      <CardTitle className="font-headline text-xl text-card-foreground">{uni.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-card-foreground/80 text-sm">{uni.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
              <div>
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  Unlock Your Potential
                </h2>
                <p className="mt-4 text-lg text-foreground/70">
                  COLLAPP offers a suite of tools designed to empower both students and institutions in the college admission process.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mr-3 mt-1" />
                    <span className="text-foreground/90">Personalized dashboards for easy tracking.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mr-3 mt-1" />
                    <span className="text-foreground/90">Direct communication channels.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mr-3 mt-1" />
                    <span className="text-foreground/90">Secure document handling.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mr-3 mt-1" />
                    <span className="text-foreground/90">Comprehensive school profiles.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-10 lg:mt-0">
                <Image 
                  src="/images/univ.jpg" 
                  alt="Students collaborating" 
                  width={600} 
                  height={450} 
                  className="rounded-xl shadow-xl"
                  data-ai-hint="students collaboration"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="login-section" ref={loginSectionRef} className="py-16 sm:py-24 bg-muted/40">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Access Your COLLAPP Portal
                </h2>
                <p className="mt-4 text-lg text-foreground/70">
                Sign in to continue your journey with COLLAPP.
                </p>
            </div>
            <LoginForm /> 
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
