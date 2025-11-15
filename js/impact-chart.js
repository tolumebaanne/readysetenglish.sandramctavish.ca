document.addEventListener("DOMContentLoaded", function() {
  const ctx = document.getElementById('impactChartCanvas').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Average Performers', 'Top Performers'],
      datasets: [{
        label: 'Seconds Silent',
        data: [0.6, 1.8],
        backgroundColor: ['#D2B56A', '#111'],
        borderRadius: 8,
        barPercentage: 0.7,         // less space between bars
        categoryPercentage: 0.5     // less space between categories
      }]
    },
    options: {
      indexAxis: 'x',
      responsive: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'LENGTH OF SILENCE AFTER AN OBJECTION',
          color: '#111',
          font: { size: 18, weight: 'bold', family: 'Playfair Display, serif' },
          padding: { bottom: 20 }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1.8,
          ticks: {
            color: '#111',
            font: { size: 14 },
            stepSize: 0.6,
            callback: function(value) {
              // Only show 0, 0.6, 1.2, 1.8
              return [0, 0.6, 1.2, 1.8].includes(value) ? value : '';
            }
          },
          title: {
            display: true,
            text: 'SECONDS SILENT',
            color: '#111',
            font: { size: 16, weight: 'bold' }
          },
          grid: { color: '#eee' }
        },
        x: {
          ticks: { color: '#111', font: { size: 14 } },
          grid: { display: false }
        }
      }
    }
  });
});