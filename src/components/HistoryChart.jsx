// src/components/HistoryChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra los componentes de Chart.js que vamos a usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Función para procesar los datos históricos y agruparlos por día
const processDataForChart = (historicalTasks = []) => {
  const tasksByDay = {}; // Ej: { "2023-10-27": 5, "2023-10-28": 3 }

  historicalTasks.forEach(task => {
    // Obtiene la fecha en formato YYYY-MM-DD
    const date = task.date.split('T')[0];
    if (!tasksByDay[date]) {
      tasksByDay[date] = 0;
    }
    tasksByDay[date]++;
  });

  // Queremos mostrar solo los últimos 7 días
  const labels = [];
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    
    labels.push(dateString.slice(5)); // Formato "MM-DD"
    data.push(tasksByDay[dateString] || 0);
  }

  return { labels, data };
};


function HistoryChart({ historicalTasks }) {
  const { labels, data } = processDataForChart(historicalTasks);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Tareas Completadas',
        data: data,
        backgroundColor: 'rgba(52, 199, 89, 0.6)', // Verde de la app
        borderColor: 'rgba(52, 199, 89, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Actividad de los Últimos 7 Días',
        color: 'var(--text-color-light)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'var(--text-color-dim)',
          stepSize: 1, // Muestra 1, 2, 3...
        },
        grid: {
          color: 'var(--border-color)',
        },
      },
      x: {
        ticks: {
          color: 'var(--text-color-dim)',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', padding: '1rem', backgroundColor: 'var(--bg-color-dark)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default HistoryChart;