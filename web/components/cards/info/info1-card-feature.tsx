'use client';
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card-ui"

interface DefaultProps {
  className?: string;
}

const Card1 = (
  props: DefaultProps
) => {
  return (
    <Card
      className={`${props.className}`}
    >
      <CardHeader>
        <CardTitle className="text-secondary">
          TOTAL VALUE
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className='text-6xl text-secondary'>
        +6% Volume Last 24h
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-lg">
        <div className="flex gap-2 font-medium leading-none">
          Watches
        </div>
        <div className="flex gap-2 leading-none text-muted-foreground text-5xl">
          +60%
        </div>
      </CardFooter> */}
    </Card>
  )
}

export default Card1;