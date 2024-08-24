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

const Card2 = () => {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>
          TOTAL VALUE
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent className='py-4 pb-12'>
        <p className='text-4xl font-semibold'>
          All Luxury Goods on our platform are authenticated
          <span style={{ color: '#00000059'}}>
            , certified, and securely stored in a third-party vault.
          </span>
        </p>
        
      </CardContent>
      <CardFooter className="flex-row justify-between gap-2 text-lg">
        <p className="text-white text-lg flex text-center truncate bg-black w-fit-content px-4 py-1 rounded-full">
          Certified
        </p>
        <Image
          src={'/icons/check-icon.svg'}
          width={40}
          height={40}
          alt='check icon'
        />
      </CardFooter>
    </Card>
  )
}

export default Card2;