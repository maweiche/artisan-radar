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
const CtaCard2 = () => {
  return (
    <Card
        className='flex flex-col p-4 gap-2 justify-center bg-zinc-700 rounded-3xl'
    >
      {/* <CardHeader>
        <CardTitle>
          TOTAL VALUE
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent className='flex flex-col py-4 gap-6'>
        <p className='text-3xl text-center text-white'>
            <span className='italic font-normal'>Diversify</span> your Portfolio
        </p>
        <p className='text-2xl text-center text-zinc-500'>
            Welcome in our high-end ownership 
            <br /> and <br />
            trade platform.<br /> 
            Collect Real World Assets
        </p>
      </CardContent>
      <CardFooter className="flex-col justify-center">
        <Button className='w-3/4 h-12 gap-6 rounded-xl bg-white'>
            <EnvelopeClosedIcon className='w-6 h-6' />
            Join Waitlist
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CtaCard2;