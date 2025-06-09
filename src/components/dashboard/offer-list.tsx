import React, { useEffect, useState } from "react";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Grid,
  Alert,
  CircularProgress
} from "@mui/material";
import {
  VisibilityOutlined,
  FileCopyOutlined,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { useGetAllEventsQuery } from "@/services/dashboard-service";

const OfferList = () => {
  const {data, isLoading, isError, error} = useGetAllEventsQuery(undefined, {
    skip: false,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.error("Error details:", error);
    }
  }, [isError, error]);


  const getStatusColor = (status: string) => {
    const colors = {
      approved: { color: "success", label: "Approved" },
      pending: { color: "warning", label: "Pending..." },
      rejected: { color: "error", label: "Rejected" },
    };
    return (
      colors[status as keyof typeof colors] || {
        color: "success",
        label: "success",
      }
    );
  };

  if (isError) {
    console.log("isError = ", isError);
    return <Alert severity="error">Something went wrong</Alert>
  }

  {loading && (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Box>
  )}

  return (
    <Box>
      <Grid container spacing={1} sx={{ p: '40px' }}>
        <Grid item xs={12} md={1}>
          SL
        </Grid>
        <Grid item xs={12} md={2}>
          Event Name
        </Grid>
        <Grid item xs={12} md={2}>
          Event Date
        </Grid>
        <Grid item xs={12} md={2}>
          Event Location
        </Grid>
        <Grid item xs={12} md={2}>
          Country
        </Grid>
        <Grid item xs={12} md={1}>
          Status
        </Grid>
        <Grid item xs={12} md={2}>
          Actions
        </Grid>
      </Grid>

      {data?.results?.map((event: any, index: number) => {
        const statusStyle = getStatusColor(event?.status);
        return (
          <Grid key={event?.id} container spacing={1} sx={{ p: '38px 40px 32px', mb: '20px', borderRadius: 2, border: '1px solid #E0E0E0' }}>
            <Grid item xs={12} md={1}>
              0{index + 1}
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2">{event?.title}</Typography>
              <Typography variant="caption" color="textSecondary">
                Powered by {event?.admin_comment}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2">
                {dayjs(event?.start_date).format("MMMM DD, YYYY")}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {event?.start_time?.slice(0, 5)} -{" "}
                {event?.end_time?.slice(0, 5)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2">{event?.country}</Typography>
              <Typography variant="caption" color="textSecondary">
                {event?.city}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2">{event?.country}</Typography>
              <Typography variant="caption" color="textSecondary">
                {event?.location}
              </Typography>
            </Grid>
            <Grid item xs={12} md={1}>
              <Chip
                label={statusStyle.label}
                color={
                  statusStyle.color as
                  | "primary"
                  | "error"
                  | "info"
                  | "success"
                  | "warning"
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <IconButton size="small">
                <VisibilityOutlined />
              </IconButton>
              <IconButton size="small">
                <FileCopyOutlined />
              </IconButton>
              <IconButton size="small">
                <EditOutlined />
              </IconButton>
              <IconButton size="small">
                <DeleteOutline />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

export default OfferList;
