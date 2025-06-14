'use client'


import React, { useEffect, useState } from "react";
import {
  Chip,
  IconButton,
  Typography,
  Box,
  Grid,
  Alert,
  CircularProgress,
  TablePagination
} from "@mui/material";
import {
  VisibilityOutlined,
  FileCopyOutlined,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { useGetAllEventsQuery } from "@/services/dashboard-service";
import { useRouter } from "next/navigation";

const OfferList = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useGetAllEventsQuery(undefined, {
    skip: false,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data) {
      setLoading(false);
      setPage(data?.current_page);
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

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(data?.current_page);
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
      <Grid container spacing={1} sx={{ p: '40px', fontWeight: 500, fontSize: '20px' }}>
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
        const displayIndex = index + 1; // Calculate the actual number (1-based)
        const formattedIndex = displayIndex < 10 ? `0${displayIndex}` : `${displayIndex}`;

        return (
          <Grid key={event?.id} container spacing={1} sx={{ p: '38px 40px 32px', mb: '20px', borderRadius: 2, border: '1px solid #E0E0E0' }} onClick={() => router.push(`/detail/${event?.id}`)}>
            <Grid item xs={12} md={1} sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
              {formattedIndex}
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{event?.title}</Typography>
              <Typography variant="caption" color="textSecondary">
                Powered by {event?.admin_comment}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {dayjs(event?.start_date).format("MMMM DD, YYYY")}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {event?.start_time?.slice(0, 5)} -{" "}
                {event?.end_time?.slice(0, 5)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{event?.country}</Typography>
              <Typography variant="caption" color="textSecondary">
                {event?.city}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{event?.country}</Typography>
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
      <TablePagination
        component="div"
        count={data?.count}
        page={data?.current_page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default OfferList;
