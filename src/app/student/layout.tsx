
'use client';

import { StudentSidebar } from '@/components/layout/student-sidebar';
import { StudentHeader } from '@/components/layout/student-header';

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout previously had a client-side auth check that caused a redirect
  // loop with hardcoded demo users. It has been removed to simplify the flow
  // and align with the other demo-user dashboards.
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <StudentSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        <StudentHeader />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
