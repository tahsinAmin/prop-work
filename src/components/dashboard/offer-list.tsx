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
} from "@mui/material";
import {
  VisibilityOutlined,
  FileCopyOutlined,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { getEvents } from "@/services/events-service";
import dayjs from "dayjs";

const OfferList = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.results);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 2, overflow: "hidden" }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F4F6F8" }}>
            <TableCell>SL</TableCell>
            <TableCell>Event Name</TableCell>
            <TableCell>Event Date</TableCell>
            <TableCell>Event Location</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event, index) => {
            const statusStyle = getStatusColor(event.status);
            return (
              <TableRow
                key={event.id}
                sx={{ "&:hover": { backgroundColor: "#F5F5F5" } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Typography variant="body2">{event.title}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Powered by {event.admin_comment}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {dayjs(event.start_date).format("MMMM DD, YYYY")}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {event.start_time.slice(0, 5)} -{" "}
                    {event.end_time.slice(0, 5)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{event.country}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {event.city}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{event.country}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {event.location}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusStyle.label}
                    color={
                      statusStyle.color as
                        | "default"
                        | "primary"
                        | "secondary"
                        | "error"
                        | "info"
                        | "success"
                        | "warning"
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OfferList;
