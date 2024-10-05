'use client';
import { Card, CardContent } from "@/components/ui/shadcn/card-ui"
import { Button } from "@/components/ui/shadcn/button-ui"
import { Input } from "@/components/ui/shadcn/input-ui"
import { useState } from 'react';

interface DefaultProps {
  className?: string;
}

const CtaCard3 = (props: DefaultProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted email:', email);
    setEmail('');
  };

  return (
    <Card className={`${props.className} w-full flex flex-col h-72 rounded-none bg-bg justify-center align-center border-none shadow-none px-12`} style={{ borderTop: 'solid 1px gray', borderBottom: 'solid 1px gray'}}>
      <CardContent className='w-full flex flex-col md:flex-row items-center justify-between px-12'>
          <div className="flex flex-col w-2/5 text-wrap">
            <h2 className="text-5xl lg:text-6xl font-cormorant mb-4">
              <span className="italic" style={{ fontWeight: '100' }}>Stay</span> updated
            </h2>
            <p className="text-base text-gray-600">
              Stay aware of everything happening in Artisan's world and all the newest features
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col w-2/5">
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow rounded-l-full border-r-0 bg-gray-100 focus:ring-0 focus:border-gray-300"
              />
              <Button type="submit" className="rounded-r-full bg-black text-white hover:bg-gray-800 px-8">
                Submit
              </Button>
            </div>
          </form>
      </CardContent>
    </Card>
  )
}

export default CtaCard3;