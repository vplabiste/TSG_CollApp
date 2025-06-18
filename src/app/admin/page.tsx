
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 text-foreground">
      <Card className="w-full max-w-md shadow-lg bg-card border-border">
        <CardHeader className="items-center">
          <ShieldCheck className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-headline text-2xl text-center text-card-foreground">Admin Dashboard (COLLAPP)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Welcome, Administrator! You have full access to COLLAPP system settings and user management.
          </p>
        </CardContent>
      </Card>
       <a href="/" className="mt-8 text-sm text-primary hover:underline">
        &larr; Back to Homepage
      </a>
    </div>
  );
}
