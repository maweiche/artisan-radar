'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/shadcn/button-ui';
import { Card, CardContent } from '@/components/ui/shadcn/card-ui';

const InvitationCTA = () => {
  return (
    <Card className="rounded-3xl h-full w-ful bg-bg text-secondary border-zinc-300 dark:border-zinc-700 relative overflow-hidden">
      <CardContent className="p-2 h-full flex flex-col">
        <div className="w-full h-full bg-bg text-secondary p-6 rounded-lg shadow-lg flex">
          <div className="flex-1 pr-6 flex flex-col items-start">
            <h2 className="text-2xl font-bold mb-4">
              Invite your friends & earn your reward!
            </h2>
            <p className="text-primary text-md mb-6 w-3/4">
              Receive $10 when a friend invests
              in their first Artisan offering.
            </p>
            <Button className="mb-6 rounded-xl bg-zinc-900 text-[#fff] dark:bg-zinc-700">
              Join the Artisan Referral Program
            </Button>
            <p className="text-primary text-xs mt-auto">
              Learn more about the Referral program
            </p>
          </div>
          {/* overlay div so text is readable */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-secondary -z-10 opacity-50" />
          <Image
            src="/products/car2.svg"
            alt="Referral program illustration"
            width={100}
            height={300}
            className="absolute top-0 right-[-60%] -z-20 h-full w-full "
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationCTA;