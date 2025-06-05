import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Box, Card, CardContent, Typography } from '@mui/material';

// Dynamically import ApexCharts to prevent SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LineChartProps {
  title: string;
  series: {
    name: string;
    data: number[];
    color?: string;
  }[];
  categories: string[];
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ title, series, categories, height = 300 }) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#000000'], // Black line color
    },
    colors: [series[0]?.color || '#000000'], // Use provided color or default to black
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.round(value).toString(),
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ height }}>
          <ReactApexChart 
            options={options} 
            series={series} 
            type="line" 
            height="100%" 
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChart;
