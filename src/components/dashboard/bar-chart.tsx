import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Box, Card, CardContent, Typography } from '@mui/material';

// Dynamically import ApexCharts to prevent SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface BarChartProps {
  title: string;
  series: {
    name: string;
    data: number[];
    color?: string;
  }[];
  categories: string[];
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ title, series, categories, height = 300 }) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
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
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
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
            type="bar" 
            height="100%" 
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarChart;
