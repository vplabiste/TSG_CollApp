
'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Application, DocumentStatus } from '@/lib/college-schemas';
import { format } from 'date-fns';
import { CheckCircle, Clock, Eye, Save, Send, AlertTriangle, XCircle } from 'lucide-react';
import { updateDocumentStatus, updateOverallApplicationStatus } from '@/app/actions/schoolrep';

interface ApplicantCardProps {
  application: Application;
  onUpdate: () => void;
}

const statusBadgeVariant = {
  'Under Review': 'secondary',
  'Accepted': 'default',
  'Rejected': 'destructive',
} as const;

const docStatusIcons: { [key in DocumentStatus]: React.ReactNode } = {
  'Pending': <Clock className="h-4 w-4 text-gray-500" />,
  'Accepted': <CheckCircle className="h-4 w-4 text-green-500" />,
  'Rejected': <XCircle className="h-4 w-4 text-red-500" />,
  'Resubmit': <AlertTriangle className="h-4 w-4 text-orange-500" />,
};

export function ApplicantCard({ application, onUpdate }: ApplicantCardProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [decisionMessage, setDecisionMessage] = useState(application.finalMessage || '');
  const isDecided = application.status !== 'Under Review';

  const handleDocumentStatusChange = (docId: string, status: DocumentStatus, note?: string) => {
    startTransition(async () => {
      const result = await updateDocumentStatus(application.id, docId, status, note);
      if (result.success) {
        toast({ title: 'Success', description: 'Document status updated.' });
        onUpdate();
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
    });
  };
  
  const handleDecision = (status: 'Accepted' | 'Rejected') => {
      if (!decisionMessage) {
          toast({ variant: 'destructive', title: 'Message Required', description: 'Please provide a message for the applicant.'});
          return;
      }
      startTransition(async () => {
          const result = await updateOverallApplicationStatus(application.id, status, decisionMessage);
          if (result.success) {
              toast({ title: 'Success', description: result.message });
              onUpdate();
          } else {
              toast({ variant: 'destructive', title: 'Error', description: result.message });
          }
      });
  }

  return (
    <AccordionItem value={application.id}>
      <AccordionTrigger>
        <div className="flex justify-between items-center w-full pr-4">
          <div className="flex items-center gap-4">
            <Image
              src={application.studentInfo.profilePictureUrl || `https://placehold.co/40x40.png`}
              alt="Student Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
              data-ai-hint="profile avatar"
            />
            <div className="text-left">
              <p className="font-semibold">{application.studentInfo.name}</p>
              <p className="text-sm text-muted-foreground">{application.studentInfo.email}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={statusBadgeVariant[application.status]}>{application.status}</Badge>
            <p className="text-xs text-muted-foreground">
              Applied: {format(new Date(application.submittedAt), 'PPP')}
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 bg-muted/50 rounded-b-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {application.documents.map((doc) => (
            <DocumentReviewCard 
              key={doc.id} 
              doc={doc} 
              onStatusChange={handleDocumentStatusChange} 
              isPending={isPending}
              isDecided={isDecided}
            />
          ))}
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Send/> Final Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    placeholder="Write a final message to the applicant (e.g., congratulations, next steps, or reasons for rejection)..."
                    value={decisionMessage}
                    onChange={(e) => setDecisionMessage(e.target.value)}
                    disabled={isPending || isDecided}
                />
                <div className="flex gap-4">
                    <Button 
                        onClick={() => handleDecision('Accepted')}
                        disabled={isPending || isDecided} 
                        className="bg-success hover:bg-success/90 text-success-foreground"
                    >
                        Accept Application
                    </Button>
                    <Button 
                        onClick={() => handleDecision('Rejected')}
                        disabled={isPending || isDecided} 
                        variant="destructive"
                    >
                        Reject Application
                    </Button>
                </div>
                 {isDecided && (
                    <p className="text-sm text-muted-foreground">
                      A final decision was made on {application.decisionDate ? format(new Date(application.decisionDate), 'PPP') : 'N/A'}.
                    </p>
                )}
            </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
}

function DocumentReviewCard({ doc, onStatusChange, isPending, isDecided }: { doc: Application['documents'][0], onStatusChange: (docId: string, status: DocumentStatus, note?: string) => void, isPending: boolean, isDecided: boolean }) {
    const [status, setStatus] = useState<DocumentStatus>(doc.status);
    const [note, setNote] = useState(doc.resubmissionNote || '');

    const handleSave = () => {
        onStatusChange(doc.id, status, note);
    }
    
    return (
        <Card className="bg-background">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                    <span className="flex items-center gap-2">
                        {docStatusIcons[doc.status]} {doc.label}
                    </span>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm"><Eye className="mr-2"/> View</Button>
                    </a>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex gap-2 items-center">
                    <Select value={status} onValueChange={(s: DocumentStatus) => setStatus(s)} disabled={isPending || isDecided}>
                        <SelectTrigger><SelectValue placeholder="Update status..."/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Accepted">Accepted</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                            <SelectItem value="Resubmit">Needs Resubmission</SelectItem>
                        </SelectContent>
                    </Select>
                     <Button size="icon" onClick={handleSave} disabled={isPending || status === doc.status || isDecided}><Save/></Button>
                </div>
                {status === 'Resubmit' && (
                    <div className="space-y-2">
                        <label htmlFor={`note-${doc.id}`} className="text-sm font-medium flex items-center gap-1.5">Note for Student</label>
                        <Textarea id={`note-${doc.id}`} placeholder="e.g., Please upload a clearer copy." value={note} onChange={(e) => setNote(e.target.value)} disabled={isPending || isDecided} />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
