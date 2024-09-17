'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/shadcn/card-ui"
import { Button } from "@/components/ui/shadcn/button-ui"
import { TwitterLogoIcon } from '@radix-ui/react-icons'
import WaitlistSignup from "@/components/waitlist/waitlist-ui";
interface DefaultProps {
  className?: string;
}

const CtaCard1 = (
  props: DefaultProps
) => {
  return (
    <Card className={`${props.className}`}>
      <CardContent className='flex flex-col py-4 pb-12 gap-4 md:items-center'>
        <p className='text-2xl text-secondary'>
          Join the waitlist:
        </p>
        <p className='text-2xl text-secondary'>
          <span className='italic text-slate-500 font-light'>Priority</span>  access & <span className='italic text-slate-500 font-light'>exclusive</span> updates
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-8 items-start md:items-center">
        <WaitlistSignup />
        <Button asChild className='w-3/4 gap-6 rounded-xl text-secondary border-solid border-2 border-secondary' variant='default'>
          <Link href={'https://x.com/ArtsnFi'} passHref target='_blank'>
            <TwitterLogoIcon className='w-6 h-6' />
            Follow on Twitter
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CtaCard1;