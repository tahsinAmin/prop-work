'use client';

import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
  IconButton,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { Icon } from '@iconify/react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  type: 'monthly' | 'yearly' | 'pay as you go';
  status: 'Accepted' | 'Pending' | 'Rejected';
}

interface OnboardingTableProps {
  users: User[];
  onEdit?: (userId: number) => void;
  onView?: (userId: number) => void;
  onDelete?: (userId: number) => void;
}

export default function OnboardingTable({ users, onEdit, onView, onDelete }: OnboardingTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Handle page changes
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  
  // Handle rows per page changes
  const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Calculate displayed users based on pagination
  const displayedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalUsers = users.length;
  
  // Function to get status chip color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Function to get status chip background color
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'rgba(84, 214, 44, 0.16)';
      case 'Pending':
        return 'rgba(255, 193, 7, 0.16)';
      case 'Rejected':
        return 'rgba(255, 72, 66, 0.16)';
      default:
        return undefined;
    }
  };
  
  // Function to get status chip text color
  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'rgb(34, 154, 22)';
      case 'Pending':
        return 'rgb(183, 129, 3)';
      case 'Rejected':
        return 'rgb(183, 33, 54)';
      default:
        return undefined;
    }
  };
  
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3, overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              {!isMobile && <TableCell>Phone number</TableCell>}
              {!isTablet && <TableCell>Company</TableCell>}
              <TableCell>Job Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right" sx={{ width: '100px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </TableCell>
                
                {!isMobile && (
                  <TableCell>{user.phone}</TableCell>
                )}
                
                {!isTablet && (
                  <TableCell>{user.company}</TableCell>
                )}
                
                <TableCell>{user.jobTitle}</TableCell>
                
                <TableCell>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {user.type}
                  </Typography>
                </TableCell>
                
                <TableCell>
                  <Chip 
                    label={user.status} 
                    size="small" 
                    sx={{ 
                      fontWeight: 500,
                      bgcolor: getStatusBgColor(user.status),
                      color: getStatusTextColor(user.status)
                    }}
                  />
                </TableCell>
                
                <TableCell align="right" sx={{ 
                  // This ensures the action buttons stay side by side even on smaller screens
                  width: { xs: '80px', sm: '100px' },
                  minWidth: 'fit-content',
                  whiteSpace: 'nowrap',
                  padding: '8px 16px'
                }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: 0.5,
                    // Ensure icons stay side by side
                    flexWrap: 'nowrap'
                  }}>
                    {onEdit && (
                      <IconButton 
                        onClick={() => onEdit(user.id)} 
                        size="small" 
                        sx={{ 
                          p: 0.5,
                          color: '#637381',
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                        }}
                      >
                        <Icon icon="ic:baseline-edit" width={20} height={20} />
                      </IconButton>
                    )}
                    
                    <IconButton 
                      size="small" 
                      sx={{ 
                        p: 0.5,
                        color: '#637381',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                      }}
                    >
                      <Icon icon="ic:baseline-more-vert" width={20} height={20} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Custom pagination that matches the design in the image */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
        px: 2,
        py: 1,
        // Ensure pagination elements stay side by side
        flexWrap: { xs: 'nowrap' },
        minWidth: { xs: 'min-content' }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2, whiteSpace: 'nowrap' }}>
            Rows per page:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 70 }}>
            <Select
              value={rowsPerPage.toString()}
              onChange={handleChangeRowsPerPage}
              displayEmpty
              sx={{ 
                height: 32,
                '& .MuiSelect-select': { py: 0.5 }
              }}
            >
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="25">25</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mx: 2, whiteSpace: 'nowrap' }}>
            {page * rowsPerPage + 1}-{Math.min(page * rowsPerPage + rowsPerPage, totalUsers)} of {totalUsers}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            // Ensure navigation buttons stay side by side
            flexWrap: 'nowrap'
          }}>
            <IconButton 
              onClick={() => handleChangePage(page - 1)} 
              disabled={page === 0}
              size="small"
              sx={{ color: page === 0 ? 'text.disabled' : 'text.secondary' }}
            >
              <Icon icon="ic:baseline-chevron-left" width={20} height={20} />
            </IconButton>
            <IconButton 
              onClick={() => handleChangePage(page + 1)} 
              disabled={page >= Math.ceil(totalUsers / rowsPerPage) - 1}
              size="small"
              sx={{ color: page >= Math.ceil(totalUsers / rowsPerPage) - 1 ? 'text.disabled' : 'text.secondary' }}
            >
              <Icon icon="ic:baseline-chevron-right" width={20} height={20} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
