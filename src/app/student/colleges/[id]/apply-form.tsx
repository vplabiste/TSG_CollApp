
'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { applicationSchema, type ApplicationInputs } from '@/lib/student-schemas';
import { submitApplication } from '@/app/actions/student';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface ApplyFormProps {
    collegeId: string;
    userId: string;
    requirements: { id: string; label: string }[];
    onSuccess: () => void;
}

export function ApplyForm({ collegeId, userId, requirements, onSuccess }: ApplyFormProps) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const form = useForm<ApplicationInputs>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {},
    });

    const onSubmit = (data: ApplicationInputs) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(`requirement-${key}`, value);
            }
        });
        
        startTransition(async () => {
            const result = await submitApplication(formData, userId, collegeId);
            if (result.success) {
                onSuccess();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Submission Failed',
                    description: result.message,
                });
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[60vh] overflow-y-auto p-1 pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requirements.map(req => (
                        <FormField
                            key={req.id}
                            control={form.control}
                            name={req.id}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{req.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                                            className="file:text-primary"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
                 <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Application
                    </Button>
                </div>
            </form>
        </Form>
    );
}
