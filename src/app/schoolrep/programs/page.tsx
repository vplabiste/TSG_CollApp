
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

export default function SchoolRepProgramsPage() {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" /> Program Management
          </CardTitle>
          <CardDescription>
            Manage your college's academic programs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Program management interface will be built here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
