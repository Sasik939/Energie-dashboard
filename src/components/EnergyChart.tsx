import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EnergyChartProps {
  title: string;
  data: number[];
  labels: string[];
  type: 'line' | 'bar';
  color: string;
  unit: string;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ 
  title, 
  data, 
  labels, 
  type = 'line',
  color = 'rgb(75, 192, 192)',
  unit = 'kWh'
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: `${title} (${unit})`,
        data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {type === 'line' ? (
        <Line options={options} data={chartData} />
      ) : (
        <Bar options={options} data={chartData} />
      )}
    </div>
  );
};

export default EnergyChart;
