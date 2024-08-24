'use client';
import styles from '@/styles/cards/ExpertiseCard.module.css'
import { Button }from '@/components/ui/shadcn/button-ui'
import Image from 'next/image';
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { Card, CardContent } from "@/components/ui/shadcn/card-ui"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel-ui"
// import { motion, MotionProps } from 'framer-motion';

const ExpertiseCard = () => {

  return (
    <div className={styles.container}>
      <h2>Our Expertise</h2>
      <Carousel className={styles.carousel}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                        <div className={styles.header}>
                          <p className={styles.number}>
                            1
                          </p>
                        </div>
                        <div className={styles.body}>
                          <Image
                            src={'/products/watch.svg'}
                            width={249}
                            height={252}
                            alt='watch image'
                            className={styles.image}
                          />
                        </div>
                        <div className={styles.footer}>
                          <p className={styles.primaryText}>
                            We acquire Luxury Goods.
                          </p>
                          <p className={styles.secondaryText}>
                            We selectively choose potential value-appreciating items.
                          </p>
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

export default ExpertiseCard;