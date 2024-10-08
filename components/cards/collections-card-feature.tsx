'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/cards/CollectionsCard.module.css';
import { Button }from '@/components/ui/shadcn/button-ui'
import { ChevronRightIcon } from "@radix-ui/react-icons"
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/shadcn/card-ui"
import { Badge } from "@/components/ui/shadcn/badge-ui"
import { Progress } from "@/components/ui/shadcn/progress-ui"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel-ui"
import { Swiper as SwiperType } from "swiper"; // Import the Swiper type
import { Swiper, SwiperSlide } from "swiper/react";
// import { motion, MotionProps } from 'framer-motion';
interface DefaultProps {
  id?: string;
  className?: string;
}

const CollectionsCard = (
  props: DefaultProps
) => {
  const [slides, setSlides] = useState(Array.from({ length: 4 }));
  // Initialize thumbsSwiper as SwiperType | null
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [progressAmount, setProgressAmount] = useState(0);
  useEffect(() => {
    // every time the CarouselItem changes, we need to update the progress bar value
    // 1 * 100 / slides.length
    setProgressAmount(1 * 100 / slides.length);
  }, [CarouselItem]);
  return (
    <div className={`${props.className}`}>
      <Badge className="w-fit self-center border-zinc-200">
        <span className='text-secondary'>The Collections</span>
      </Badge>
      <div className="swiper-container hidden md:block relative mb-5">
        <Swiper
          onSwiper={setThumbsSwiper} // Store the instance of the thumbs swiper in the state
          spaceBetween={15}
          slidesPerView={3} // Show 3 thumbnails at a time
          watchSlidesProgress // Keep track of which thumbnail is active
          className="thumbs-swiper"
        >
          <SwiperSlide className="border-gray rounded-2xl p-2 w-1/4"></SwiperSlide>
          {slides.map((image, index) => (
            <SwiperSlide key={index} className="border-gray rounded-2xl p-2 ">
              <Card className="flex flex-col justify-between h-full p-1 h-96">
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
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
                      <p className="bg-secondary px-2 rounded-full text-primary text-md">
                        {index * 2} assets available
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
                      src={
                        index == 0 ? '/products/rolex-bg.svg':
                        index == 1 ? '/products/car.svg':
                        index == 2 ? '/products/diamond.svg':
                        '/products/whisky.svg'
                      }
                      width={200}
                      height={200}
                      alt='car image'
                    />
                  </div>
                  <div className={styles.footer}>
                    <Button className='bg-secondary text-primary' variant="default">Check the whole collection</Button>
                    <Progress value={33} className="w-[60%]" />
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
          {slides.map((image, index) => (
            <SwiperSlide key={index} className="border-gray rounded-2xl p-2 ">
              <Card className="flex flex-col justify-between h-full p-1 h-96">
                <CardContent className="flex flex-col items-center justify-center p-6 h-full">
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
                      <p className="bg-secondary px-2 rounded-full text-primary text-md">
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
                    <Button className='bg-secondary text-primary' variant="default">Check the whole car collection</Button>
                    <Progress value={33} className="w-[60%]" />
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

export default CollectionsCard;
