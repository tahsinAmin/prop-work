import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  SelectChangeEvent,
  styled,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { getOffers, Offer, OffersParams } from "@/services/offers-service";
import { getEvents } from "@/services/events-service";

// Mock data for fallback
const MOCK_OFFERS: Offer[] = [
  {
    id: 1,
    user_name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    status: "accepted",
    type: "Monthly",
  },
  {
    id: 2,
    user_name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    status: "rejected",
    type: "Yearly",
  },
  {
    id: 3,
    user_name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    status: "pending",
    type: "Monthly",
  },
  {
    id: 4,
    user_name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    status: "accepted",
    type: "Pay As You Go",
  },
  {
    id: 5,
    user_name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    status: "accepted",
    type: "Monthly",
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  textTransform: "capitalize",
  fontWeight: 500,
  "&.MuiChip-filledSuccess": {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
  "&.MuiChip-filledError": {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  },
  "&.MuiChip-filledWarning": {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
  },
}));

interface OfferListProps {}

const OfferList: React.FC<OfferListProps> = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [filterType, setFilterType] = useState("All");
  const [paginationMeta, setPaginationMeta] = useState<{
    from: number;
    to: number;
    total: number;
    current_page: number;
  }>({ from: 0, to: 0, total: 0, current_page: 1 });

  // Fetch offers
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      setError(null);

      try {
        const params: OffersParams = {
          page: page + 1, // API is 1-indexed
          per_page: rowsPerPage,
        };

        // Add status filter if tab is not "All"
        if (tabValue === 1) {
          params.status = "accepted";
        }

        // Add search term if provided
        if (searchValue) {
          params.search = searchValue;
        }

        // Add type filter if not "All"
        if (filterType !== "All") {
          params.type = filterType.toLowerCase();
        }

        const response = await getOffers(params);
        const events = await getEvents();
        console.log("events", events);
        setOffers(response.data);

        // Handle pagination metadata
        if (response.meta) {
          setTotalCount(response.meta.total);
          setPaginationMeta({
            from: response.meta.from,
            to: response.meta.to,
            total: response.meta.total,
            current_page: response.meta.current_page,
          });
        } else {
          // Fallback if meta is not available
          setTotalCount(response.total || 0);
          const from = page * rowsPerPage + 1;
          const to = Math.min((page + 1) * rowsPerPage, response.total || 0);
          setPaginationMeta({
            from,
            to,
            total: response.total || 0,
            current_page: response.current_page || page + 1,
          });
        }
      } catch (err) {
        console.error("Error fetching offers:", err);
        // Use mock data instead of showing an error
        setOffers(MOCK_OFFERS);
        setTotalCount(MOCK_OFFERS.length);

        // Set mock pagination metadata
        const from = page * rowsPerPage + 1;
        const to = Math.min((page + 1) * rowsPerPage, MOCK_OFFERS.length);
        setPaginationMeta({
          from,
          to,
          total: MOCK_OFFERS.length,
          current_page: page + 1,
        });
        setError("Using sample data. Could not connect to the API.");
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, [page, rowsPerPage, tabValue, searchValue, filterType]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0); // Reset to first page when changing tabs
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setFilterType(event.target.value as string);
    setPage(0);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return <Box sx={{ p: 2, color: "error.main" }}>Error: {error}</Box>;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
          p: 3,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Offer List
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="offer list tabs"
            sx={{
              "& .MuiTabs-indicator": { height: 3, backgroundColor: "#000000" },
              "& .Mui-selected": { color: "#000000" },
            }}
            textColor="inherit"
            indicatorColor="primary"
          >
            <Tab label="All" />
            <Tab label="Accepted" />
          </Tabs>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
              size="medium"
              sx={{ width: "50%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType.toLowerCase()}
                size="medium"
                label="Type"
                onChange={handleTypeChange}
                sx={{
                  width: { xs: "150px", sm: "200px" },
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
                <MenuItem value="pay as you go">Pay As You Go</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="offer list table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone number</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map((offer) => (
                <StyledTableRow key={offer.id}>
                  <TableCell component="th" scope="row">
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {offer.user_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {offer.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{offer.phone}</TableCell>
                  <TableCell>{offer.company}</TableCell>
                  <TableCell>{offer.jobTitle}</TableCell>
                  <TableCell>{offer.type}</TableCell>
                  <TableCell>
                    <StatusChip
                      label={offer.status}
                      color={
                        offer.status === "accepted"
                          ? "success"
                          : offer.status === "rejected"
                          ? "error"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 2,
            p: 2,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Rows per page:
            </Typography>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              size="small"
              sx={{ height: 32, mr: 2 }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
            <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
              {`${paginationMeta.from || 1}-${
                paginationMeta.to || rowsPerPage
              } of ${paginationMeta.total || totalCount}`}
            </Typography>
          </Box>
          <Box>
            <IconButton
              disabled={page === 0}
              onClick={(e) => handleChangePage(e, page - 1)}
              size="small"
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              disabled={page >= Math.ceil(totalCount / rowsPerPage) - 1}
              onClick={(e) => handleChangePage(e, page + 1)}
              size="small"
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default OfferList;
