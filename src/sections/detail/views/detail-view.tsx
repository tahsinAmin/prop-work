"use client";

import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import ShareIcon from "@mui/icons-material/Share";
import SimilarEvents from "@/components/dashboard/similar-events";
import Advisor from "@/components/dashboard/advisor";
import { useGetSingleEventQuery } from "@/services/dashboard-service";
import { useEffect } from "react";

export default function DetailView() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleEventQuery(id);

  useEffect(() => {
    if (data) {
      console.log("data", data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.error("Error details:", error);
    }
  }, [isError, error]);

  if (isError) {
    console.log("isError = ", isError);
    return <Alert severity="error">Something went wrong</Alert>;
  }

  {
    isLoading && (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Mock data - replace with actual data fetching
  const eventData = {
    id,
    title: data?.title,
    category: "REAL ESTATE EVENTS",
    subCategory: "Property Showcases & Launches",
    status: "approved",
    eventType: "Online",
    startDate: data?.start_date,
    endDate: data?.end_date,
    startTime: data?.start_time,
    endTime: data?.end_time,
    location: data?.location,
    locationLink: data?.location_link,
    videoLink: data?.video_link,
    description: data?.description,
    coverImage: "/game-1.jpg",
    admin_comment: "RAK Properties",
    city: "Al Ain",
    country: data?.country,
  };

  return (
    <Box>
      {/* Banner Image - Full Width */}
      <Box
        sx={{
          width: "100%",
          height: "419px",
          borderRadius: 2,
          pr: "140px",
        }}
      >
        <Image
          src={eventData.coverImage}
          alt={eventData.title}
          width={1300}
          height={391}
        />
      </Box>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "space-between", pr: "140px" }}
      >
        <Box>
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: "500", fontSize: "32px" }}>
              {data?.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                gap: 16,
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  {new Date(
                    `1970-01-01T${eventData.startTime}`
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  -{" "}
                  {new Date(
                    `1970-01-01T${eventData.endTime}`
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  at{" "}
                  {new Date(eventData.startDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Powered by {eventData.admin_comment}</Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 0 }}>
              <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
                {eventData.category}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "18px",
                  color: "primary.main",
                }}
              >
                {eventData.subCategory}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: 1,
          }}
        >
          <Box
            sx={{
              fontSize: "24px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{ fontSize: "20px", color: "primary.main" }}
            >
              {eventData.city}
            </Box>
            <Box>{eventData.country}</Box>
            <Image src="/send.jpg" alt="send" width={20} height={20} />
          </Box>
          <Typography>Another District or anything name need</Typography>

          <Button
            variant="outlined"
            color="primary"
            endIcon={<ShareIcon />}
            sx={{
              backgroundColor: "#F4F8EE",
              textTransform: "none",
              width: "218px",
              height: "60px",
            }}
          >
            Share Event
          </Button>
        </Box>
      </Stack>
      <Typography sx={{ mb: 5, pr: "140px" }}>
        {eventData.description}
      </Typography>

      {/* Video and Map Section */}
      <Grid container spacing={4} sx={{ mb: 4, pr: "140px" }}>
        {/* Video Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 1 }}>
            <Typography
              sx={{ fontWeight: "500", fontSize: "32px", lineHeight: 1.2 }}
            >
              Event Videos
            </Typography>
            <Typography
              sx={{ fontWeight: "400", fontSize: "16px", lineHeight: 1 }}
            >
              For Better Understand
            </Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 300,
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              "&:hover .play-button": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Image
              src="/video-1.jpg"
              alt="Event Trailer"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Grid>

        {/* Map Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 1 }}>
            <Typography
              sx={{ fontWeight: "500", fontSize: "32px", lineHeight: 1.2 }}
            >
              Event Location
            </Typography>
            <Typography
              sx={{ fontWeight: "400", fontSize: "16px", lineHeight: 1 }}
            >
              Find our place easly
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 300,
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e0e0e0",
            }}
          >
            {/* Replace with your map component */}
            <Typography color="text.secondary">
              Map will be displayed here
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Meeting Link and Register Button */}
      <Grid container spacing={4} sx={{ pr: "140px" }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            Event
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "primary.main", fontSize: "32px", lineHeight: 1 }}
          >
            Meeting Link
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              overflow: "hidden",
              height: "65px",
              width: "100%",
              backgroundColor: "background.paper",
            }}
          >
            <Box
              sx={{
                px: 2,
                display: "flex",
                alignItems: "center",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                backgroundColor: "background.paper",
                color: "primary.main",
              }}
            >
              {data?.meeting_link}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 600,
              width: "100%",
              height: "60px",
              // mt: { xs: 2, sm: '28px' }
            }}
          >
            Register Now
          </Button>
        </Grid>
      </Grid>
      <SimilarEvents />
      {/* Meet Our Advisor Section */}
      <Advisor />
    </Box>
  );
}