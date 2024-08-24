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
const CtaCard1 = () => {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>
          TOTAL VALUE
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent className='flex flex-col py-4 pb-12 gap-4'>
        <p className='text-2xl'>
            Gain <span className='italic font-light'>priority</span> access by joining the waitlist
        </p>
        <p className='text-2xl text-slate-500'>
            Get Updated And Discover All The News in The Artisan
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-8 items-start">
        <Button className='w-3/4 gap-6'>
            <EnvelopeClosedIcon className='w-6 h-6' />
            Join Waitlist
        </Button>
        <Button className='w-3/4 gap-6' variant='default'>
            <TwitterLogoIcon className='w-6 h-6' />
            Follow on Twitter
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CtaCard1;