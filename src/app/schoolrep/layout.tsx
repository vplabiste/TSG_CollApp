
import { SchoolRepSidebar } from '@/components/layout/schoolrep-sidebar';
import { SchoolRepHeader } from '@/components/layout/schoolrep-header';

export default function SchoolRepDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <SchoolRepSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        <SchoolRepHeader />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
