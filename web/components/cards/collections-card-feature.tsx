'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/cards/CollectionsCard.module.css';
import { Button }from '@/components/ui/shadcn/button-ui'
import { ChevronRightIcon } from "@radix-ui/react-icons"
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/shadcn/card-ui"
import { Badge } from "@/components/ui/shadcn/badge-ui"
import { Progress } from "@/components/ui/shadcn/progress-ui"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel-ui"
// import { motion, MotionProps } from 'framer-motion';
interface DefaultProps {
  className?: string;
}

const CollectionsCard = (
  props: DefaultProps
) => {
  const [slides, setSlides] = useState(Array.from({ length: 5 }));
  const [progressAmount, setProgressAmount] = useState(0);
  useEffect(() => {
    // every time the CarouselItem changes, we need to update the progress bar value
    // 1 * 100 / slides.length
    setProgressAmount(1 * 100 / slides.length);
  }, [CarouselItem]);
  return (
    <div className={`${props.className}`}>
      <Badge variant="outline" className="w-fit px-4 items-center flex flex-row self-center text-2xl rounded-full">The Collections</Badge>
       <Carousel style={{ justifySelf: 'center'}} showProgress={true }>
        <CarouselContent>
          {slides.map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                        <div className={styles.header}>
                          <Button variant="ghost" size="icon">
                            <Image
                              src={'/icons/car-icon.svg'}
                              width={60}
                              height={60}
                              alt='check icon'
                            />
                          </Button>
                          <div className={styles.badges}>
                            <p className="bg-secondary px-2 rounded-full text-secondaryText text-md">
                              3 assets available
                            </p>
                            <Image
                              src={'/icons/check-icon.svg'}
                              width={30}
                              height={30}
                              alt='check icon'
                            />
                          </div>
                        </div>
                        <div className={styles.body}>
                          <Image
                            src={'/products/car.svg'}
                            width={200}
                            height={200}
                            alt='car image'
                          />
                        </div>
                        <div className={styles.footer}>
                          <Button className='bg-secondary text-secondaryText' variant="default">Check the whole car collection</Button>
                          <Progress value={33} className="w-[60%]" />
                        </div>
                      </CardContent>
                    </Card>
                </div>
              </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
        
      </Carousel>
      
    </div>
  );

};

export default CollectionsCard;
