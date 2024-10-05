'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import * as z from 'zod';
import { Button } from "@/components/ui/shadcn/button-ui";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/shadcn/form-ui";
import { Input } from "@/components/ui/shadcn/input-ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group-ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select-ui";
import { Checkbox } from "@/components/ui/shadcn/checkbox-ui";
import { useToast } from '@/hooks/use-toast';
import { addToWaitlist } from "@/hooks/add-to-waitlist";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn/dialog-ui"

interface DefaultProps {
    className?: string;
}

const FormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    interest: z.enum(["Watches", "Jewelry", "Cars", "Antiques", "All"]),
    vipAccess: z.boolean(),
    referOthers: z.boolean(),
    updatePreference: z.enum(["Updates", "Launch"]),
});

type FormValues = z.infer<typeof FormSchema>;

const WaitlistSignup = (
    props: DefaultProps
) => {
    const { toast } = useToast();
    
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          name: "",
          email: "",
          interest: "Watches",
          vipAccess: false,
          referOthers: false,
          updatePreference: "Updates",
        },
    });

    const onSubmit = async (_data: z.infer<typeof FormSchema>) => {
    const { name, email,  interest, vipAccess, referOthers, updatePreference,  } = _data;
    const res = await addToWaitlist(
        name,
        email,
        interest,
        vipAccess,
        referOthers,
        updatePreference,
    );
    if (res.status === 200) {
        toast({
            title: "Success!",
            description: "You've been added to the waitlist",
            // action: (
            //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            // ),
        })
        } else {
        toast({
            title: "Error",
            description: "There was an error adding you to the waitlist",
        })
        }
    } 


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full sm:w-auto px-6 py-2 rounded-lg border border-1-solid border-black' variant='default'>
                    <EnvelopeClosedIcon className='w-6 h-6 mr-2' />Join the waitlist!
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[screen] bg-bg">
                <DialogHeader>
                <DialogTitle>Join the Waitlist!</DialogTitle>
                <DialogDescription>
                    Stay up to date with the latest news and updates.
                </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="interest"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>What are you most interested in?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your main interest" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="Registering IP">Registering IP</SelectItem>
                                    <SelectItem value="Monetizing artwork">Monetizing artwork</SelectItem>
                                    <SelectItem value="Discovering creators">Discovering creators</SelectItem>
                                    <SelectItem value="Supporting artists">Supporting artists</SelectItem>
                                    <SelectItem value="Collaborating">Collaborating</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vipAccess"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                    Join VIP group for early access
                                    </FormLabel>
                                </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="referOthers"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                    Refer others to join the waitlist for special rewards
                                    </FormLabel>
                                </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="updatePreference"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Update Preference</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="Updates" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Receive platform updates</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="Launch" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{"Just notify me when it's live"}</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Join Waitlist</Button>
                    </form>
                </Form>
          </DialogContent>
        </Dialog>
      );
    }

export default WaitlistSignup;