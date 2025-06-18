
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 text-foreground">
      <Card className="w-full max-w-md shadow-lg bg-card border-border">
        <CardHeader className="items-center">
          <User className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-headline text-2xl text-center text-card-foreground">Student Dashboard (COLLAPP)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Welcome to COLLAPP! Track your applications, explore schools, and manage your profile.
          </p>
        </CardContent>
      </Card>
      <a href="/" className="mt-8 text-sm text-primary hover:underline">
        &larr; Back to Homepage
      </a>
    </div>
  );
}
