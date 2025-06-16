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
import { Box, Divider, Typography } from "@mui/material";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

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
        <SwiperSlide>
          <Card sx={{ width: '100%', borderRaius: '0px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/game-1.jpg"
                alt="green iguana"
              />
              <CardContent sx={{ px: 2, py: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  Ajmon Brokers Event
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>
                    10:00 a.m. - 7:00 p.m.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>Powered by</Typography>
                    <Typography sx={{ color: "#B3B3B3", fontSize: "14px" }}> RAK Properties</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, backgroundColor: 'primary.main' }} />
                <Typography sx={{ color: '#000', textAlign: 'left' }}>
                  A once in a generation opportunity to secure a luxury custom built home in what will be one of Sydney’s great waterfront estates with a
                  large private marina pen in the heart
                  {/* of Pittwater */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ width: '100%', borderRaius: '0px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/game-1.jpg"
                alt="green iguana"
              />
              <CardContent sx={{ px: 2, py: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  Ajmon Brokers Event
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>
                    10:00 a.m. - 7:00 p.m.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>Powered by</Typography>
                    <Typography sx={{ color: "#B3B3B3", fontSize: "14px" }}> RAK Properties</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, backgroundColor: 'primary.main' }} />
                <Typography sx={{ color: '#000', textAlign: 'left' }}>
                  A once in a generation opportunity to secure a luxury custom built home in what will be one of Sydney’s great waterfront estates with a
                  large private marina pen in the heart
                  {/* of Pittwater */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ width: '100%', borderRaius: '0px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/game-1.jpg"
                alt="green iguana"
              />
              <CardContent sx={{ px: 2, py: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  Ajmon Brokers Event
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>
                    10:00 a.m. - 7:00 p.m.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>Powered by</Typography>
                    <Typography sx={{ color: "#B3B3B3", fontSize: "14px" }}> RAK Properties</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, backgroundColor: 'primary.main' }} />
                <Typography sx={{ color: '#000', textAlign: 'left' }}>
                  A once in a generation opportunity to secure a luxury custom built home in what will be one of Sydney’s great waterfront estates with a
                  large private marina pen in the heart
                  {/* of Pittwater */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ width: '100%', borderRaius: '0px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/game-1.jpg"
                alt="green iguana"
              />
              <CardContent sx={{ px: 2, py: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  Ajmon Brokers Event
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>
                    10:00 a.m. - 7:00 p.m.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>Powered by</Typography>
                    <Typography sx={{ color: "#B3B3B3", fontSize: "14px" }}> RAK Properties</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, backgroundColor: 'primary.main' }} />
                <Typography sx={{ color: '#000', textAlign: 'left' }}>
                  A once in a generation opportunity to secure a luxury custom built home in what will be one of Sydney’s great waterfront estates with a
                  large private marina pen in the heart
                  {/* of Pittwater */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ width: '100%', borderRaius: '0px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/game-1.jpg"
                alt="green iguana"
              />
              <CardContent sx={{ px: 2, py: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  Ajmon Brokers Event
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>
                    10:00 a.m. - 7:00 p.m.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>Powered by</Typography>
                    <Typography sx={{ color: "#B3B3B3", fontSize: "14px" }}> RAK Properties</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, backgroundColor: 'primary.main' }} />
                <Typography sx={{ color: '#000', textAlign: 'left' }}>
                  A once in a generation opportunity to secure a luxury custom built home in what will be one of Sydney’s great waterfront estates with a
                  large private marina pen in the heart
                  {/* of Pittwater */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ width: '100%', borderRaius: '0px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/game-1.jpg"
                alt="green iguana"
              />
              <CardContent sx={{ px: 2, py: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  Ajmon Brokers Event
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>
                    10:00 a.m. - 7:00 p.m.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>Powered by</Typography>
                    <Typography sx={{ color: "#B3B3B3", fontSize: "14px" }}> RAK Properties</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, backgroundColor: 'primary.main' }} />
                <Typography sx={{ color: '#000', textAlign: 'left' }}>
                  A once in a generation opportunity to secure a luxury custom built home in what will be one of Sydney’s great waterfront estates with a
                  large private marina pen in the heart
                  {/* of Pittwater */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ width: '100%', borderRaius: '0px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/game-1.jpg"
                alt="green iguana"
              />
              <CardContent sx={{ px: 2, py: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  Ajmon Brokers Event
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>
                    10:00 a.m. - 7:00 p.m.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "left", }}>Powered by</Typography>
                    <Typography sx={{ color: "#B3B3B3", fontSize: "14px" }}> RAK Properties</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, backgroundColor: 'primary.main' }} />
                <Typography sx={{ color: '#000', textAlign: 'left' }}>
                  A once in a generation opportunity to secure a luxury custom built home in what will be one of Sydney’s great waterfront estates with a
                  large private marina pen in the heart
                  {/* of Pittwater */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
