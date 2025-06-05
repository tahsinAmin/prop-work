import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface MetricCardProps {
  title: string;
  value: string | number;
  percentChange?: number;
  period?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2)
}));

const MetricCard: React.FC<MetricCardProps> = ({ title, value, percentChange, period }) => {
  const isPositive = percentChange ? percentChange > 0 : null;
  
  return (
    <StyledCard>
      <CardContent sx={{ p: 0 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          {value}
        </Typography>
        
        {percentChange !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Box
              component="span"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: isPositive ? 'success.main' : 'error.main',
                mr: 1
              }}
            >
              {isPositive ? '↑' : '↓'} {Math.abs(percentChange)}%
            </Box>
            {period && (
              <Typography variant="caption" color="text.secondary">
                {period}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default MetricCard;
