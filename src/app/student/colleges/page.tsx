
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CollegesPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold tracking-tight text-primary mb-6">Explore Colleges</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search for colleges or programs..." 
          className="pl-10"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Colleges</CardTitle>
          <CardDescription>
            This section will display a list of colleges added by the administrator. 
            You will be able to filter them and apply directly.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-center text-muted-foreground py-8">
              No colleges available yet. Please check back later.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
