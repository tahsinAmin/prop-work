import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../../../public/styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import { Box, Typography } from "@mui/material";

export default function SimilarEvents() {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  return (
    <>
      <Box sx={{ mb: 0 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: "32px",
            mb: 0,
            position: "relative",
            display: "inline-block",
            bottom: "-43px",
          }}
        >
          Explore some similar Events
        </Typography>
      </Box>

      <Swiper
        style={{ paddingTop: "80px", marginTop: 0 }}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
      </Swiper>
    </>
  );
}
