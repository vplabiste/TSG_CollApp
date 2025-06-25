
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, FileText } from "lucide-react";

export default function ApplicationsPage() {
  return (
    <div className="w-full">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-6">Applications & Notifications</h1>

        <div className="grid gap-6">
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> My Applications</CardTitle>
                  <CardDescription>Track the status of your college applications here.</CardDescription>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">Application tracking functionality will be implemented here.</p>
              </CardContent>
          </Card>

          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
                  <CardDescription>Stay updated with the latest news and alerts.</CardDescription>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">Notification system will be implemented here.</p>
              </CardContent>
          </Card>
        </div>
    </div>
  );
}
