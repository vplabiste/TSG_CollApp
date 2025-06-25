
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Briefcase, Building2, Loader2, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';
import { getCollegeByRepId, getApplicationsByCollege } from '@/app/actions/schoolrep';
import type { College, Application } from '@/lib/college-schemas';

function DashboardSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-10 w-1/3 mb-6" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <div className="mt-8">
        <Skeleton className="h-60" />
      </div>
    </div>
  )
}

export default function SchoolRepDashboardPage() {
  const [college, setCollege] = useState<College | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const fetchedCollege = await getCollegeByRepId(firebaseUser.uid);
          if (fetchedCollege) {
            setCollege(fetchedCollege);
            if (!fetchedCollege.isPublished) {
              router.replace('/schoolrep/onboarding');
              return;
            }
            const fetchedApplications = await getApplicationsByCollege(fetchedCollege.id);
            setApplications(fetchedApplications);
          } else {
            setError("No college is associated with your account. Please contact the administrator.");
          }
        } catch (e: any) {
          console.error("Failed to fetch college data:", e);
          setError("Failed to load your dashboard. Please try refreshing.");
        }
      } else {
        setError("No authenticated user found. Please login.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);


  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !college) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || 'Could not load your college data.'}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome, {college.name} Rep!</h1>
            <p className="text-muted-foreground">Here's an overview of your college's activity on COLLAPP.</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              Students who applied via COLLAPP
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programs Offered</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{college.programs?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
             Listed academic programs
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Published</div>
            <p className="text-xs text-muted-foreground">
              Your profile is live for students
            </p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Recent Applicants</CardTitle>
          <CardDescription>
            The latest students who have applied to your college.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-center py-16 text-muted-foreground">Applicant data can be viewed on the 'Applications' page.</p>
        </CardContent>
      </Card>

    </div>
  );
}
