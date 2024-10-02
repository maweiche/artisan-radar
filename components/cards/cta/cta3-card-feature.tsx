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
import WaitlistSignup from "@/components/waitlist/waitlist-ui";
 
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
      <CardFooter className="flex-col w-full items-center gap-8 items-start">
        <WaitlistSignup className='bg-secondary w-1/3 min-w-fit text-bgsecondary text-2xl gap-8 rounded-full self-center'/>
      </CardFooter>
    </Card>
  )
}

export default CtaCard3;