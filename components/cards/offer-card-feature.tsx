import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card-ui";
import { Button } from "@/components/ui/shadcn/button-ui";
import Image from 'next/image';

const OfferCard = () => {
  return (
    <Card className="w-11/12 h-96 md:w-8/12 self-center bg-gradient-to-br from-gray-800 to-gray-900 text-white overflow-hidden">
      <CardContent className="p-0 relative h-full ">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-800 to-gray-900 opacity-50"></div>
        <div className="absolute top-12 -right-20 md:-right-36 flex flex-col w-full self-center items-center">
            <Image
                src="/products/rolex-2.svg"
                alt="Luxury Watch"
                width={300}
                height={300}
                className="h-auto w-45 md:w-1/2 object-cover transform scale-150"
            />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
          <h2 className="text-2xl font-bold mb-2">
            We offer the opportunity to access these markets through
            digitization with a starting investment of just $100.
          </h2>
          <p className="text-gray-300 mb-4">
            Luxury Markets and Vintage collections tend to appreciate over time, yet they
            often remain out of reach for the majority of individuals.
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-black bg-opacity-50 p-4">
        <Button variant="outline" className="bg-white text-black hover:bg-gray-200">
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OfferCard;