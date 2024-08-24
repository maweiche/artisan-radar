'use client';
import styles from '@/styles/cards/CollectionsCard.module.css';
import { Button }from '@/components/ui/shadcn/button-ui'
import { ChevronRightIcon } from "@radix-ui/react-icons"
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/shadcn/card-ui"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel-ui"
// import { motion, MotionProps } from 'framer-motion';

const CollectionsCard = () => {

  return (
    <div className={styles.container}>
      <h2>The Collections</h2>
      <Carousel style={{ justifySelf: 'center'}}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
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
                            <p className={styles.badgesText}>
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
                          <Button style={{ color: 'white', backgroundColor: 'black'}} variant="default">Check the whole car collection</Button>
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
