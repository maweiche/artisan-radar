'use client';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card-ui"
import { Button } from "@/components/ui/shadcn/button-ui"
import { EnvelopeClosedIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form-ui"
import { Input } from "@/components/ui/shadcn/input-ui"
 
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Must be a valid email.",
  }),
})

interface DefaultProps {
  className?: string;
}

const CtaCard3 = (
  props: DefaultProps
) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Card
        style={{ width:'100vw', alignSelf: 'center' }}
        className={`${props.className} rounded-none flex flex-col p-4 items-center bg-zinc-200`}
    >
      {/* <CardHeader>
        <CardTitle>
          TOTAL VALUE
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent className='flex flex-col py-4 pb-12 gap-8 items-center'>
        <p className='text-6xl text-center'>
            <span className='italic font-light'>Stay</span> updated
        </p>
        <p className='text-2xl text-slate-500'>
          Get the latest updates and features from Artisan
        </p>
      </CardContent>
      <CardFooter className="flex-col items-center gap-8 items-start">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6 flex-col items-center flex">
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                        <Input className="w-80 rounded-3xl bg-white h-16"  placeholder="Your email address" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                        This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button className="w-80 bg-black text-white rounded-xl h-16 text-lg" type="submit">Submit</Button>
            </form>
        </Form>
      </CardFooter>
    </Card>
  )
}

export default CtaCard3;