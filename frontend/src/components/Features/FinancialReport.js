import React from 'react';
import { Bar } from 'react-chartjs-2';

const FinancialReport = ({ fees }) => {
  // Extracting dates and total fees for each day
  const dataByDate = fees.reduce((acc, fee) => {
    const date = fee.paymentDate;
    acc[date] = acc[date] ? acc[date] + fee.feeAmount : fee.feeAmount;
    return acc;
  }, {});

  // Sorting the data by date
  const sortedDates = Object.keys(dataByDate).sort();

  // Labels for X-axis (dates)
  const labels = sortedDates;

  // Data for Y-axis (total fees)
  const data = sortedDates.map((date) => dataByDate[date]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Fees Collected',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time', // Change type to 'time' for the x-axis
        time: {
          unit: 'day',
          parser: 'YYYY-MM-DD' // Specify date format
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Amount Collected' // Y-axis label
        }
      }
    }
  };

  return (
    <div>
      <h2>Financial Report</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default FinancialReport;
