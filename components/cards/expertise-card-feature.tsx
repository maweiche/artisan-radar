'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/cards/ExpertiseCard.module.css'
import { Button }from '@/components/ui/shadcn/button-ui'
import Image from 'next/image';
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { Card, CardContent } from "@/components/ui/shadcn/card-ui"
import { Swiper as SwiperType } from "swiper"; // Import the Swiper type
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel-ui"
import { Badge } from "@/components/ui/shadcn/badge-ui"
// import { motion, MotionProps } from 'framer-motion';
interface DefaultProps {
  className?: string;
}

const ExpertiseCard = (
  props: DefaultProps
) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [progressAmount, setProgressAmount] = useState(0);
  // return (
  //   <div className={`${props.className}`}>
  //     <Badge variant="outline" className="w-fit px-4 items-center flex flex-row self-center text-2xl rounded-full">Our Expertise</Badge>
  //     <Carousel className={styles.carousel}>
  //       <CarouselContent>
  //         {Array.from({ length: 5 }).map((_, index) => (
  //             <CarouselItem key={index}>
  //               <div className="p-1">
  //                   <Card>
  //                     <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
  //                       <div className={styles.header}>
  //                         <p className="text-secondary text-8xl">
  //                           1
  //                         </p>
  //                       </div>
  //                       <div className={styles.body}>
  //                         <Image
  //                           src={'/products/watch.svg'}
  //                           width={249}
  //                           height={252}
  //                           alt='watch image'
  //                           className={styles.image}
  //                         />
  //                       </div>
  //                       <div className={styles.footer}>
  //                         <p className="text-secondary text-xl">
  //                           We acquire Luxury Goods.
  //                         </p>
  //                         <p className="text-secondary text-xl">
  //                           We selectively choose potential value-appreciating items.
  //                         </p>
  //                       </div>
  //                     </CardContent>
  //                   </Card>
  //               </div>
  //             </CarouselItem>
  //         ))}
  //       </CarouselContent>
  //       {/* <CarouselPrevious />
  //       <CarouselNext /> */}
  //     </Carousel>
  //   </div>
  // );

  return (
    <div className={`${props.className}`}>
      <Badge variant="outline" className="w-fit px-4 items-center flex flex-row self-center text-2xl rounded-full">The Collections</Badge>
      <div className="swiper-container hidden md:block relative mb-5">
        <Swiper
          onSwiper={setThumbsSwiper} // Store the instance of the thumbs swiper in the state
          spaceBetween={15}
          slidesPerView={4} // Show 3 thumbnails at a time
          watchSlidesProgress // Keep track of which thumbnail is active
          className="thumbs-swiper"
        >
          <SwiperSlide className="border-gray rounded-2xl p-2 w-1/4"></SwiperSlide>
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} className="border-gray rounded-2xl p-2 ">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  <div className={styles.header}>
                    <p className="text-secondary text-8xl">
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
                    <p className="text-secondary text-xl">
                      We acquire Luxury Goods.
                    </p>
                    <p className="text-secondary text-xl">
                      We selectively choose potential value-appreciating items.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper-container md:hidden relative mb-5">
        <Swiper
          onSwiper={setThumbsSwiper} // Store the instance of the thumbs swiper in the state
          spaceBetween={15}
          slidesPerView={1} // Show 3 thumbnails at a time
          watchSlidesProgress // Keep track of which thumbnail is active
          className="thumbs-swiper"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} className="border-gray rounded-2xl p-2 ">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  <div className={styles.header}>
                    <p className="text-secondary text-8xl">
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
                    <p className="text-secondary text-xl">
                      We acquire Luxury Goods.
                    </p>
                    <p className="text-secondary text-xl">
                      We selectively choose potential value-appreciating items.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>    
    </div>
  );
};

export default ExpertiseCard;
