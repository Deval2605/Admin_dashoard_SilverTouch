Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;
Chart.defaults.color = '#64748b';

$(document).ready(function() {
  // Revenue Line Chart
  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx) {
    const revenueGradient = revenueCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    revenueGradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    revenueGradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');

    window.revenueChartInstance = new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue',
          data: [4200, 5800, 4900, 7200, 6100, 8400, 9100],
          borderColor: '#6366f1',
          backgroundColor: revenueGradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#6366f1',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Weekly Revenue', padding: { bottom: 20 } }
        },
        scales: {
          y: { beginAtZero: true, grid: { borderDash: [4, 4], color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Category Donut Chart
  const categoryCtx = document.getElementById('categoryChart');
  if (categoryCtx) {
    window.categoryChartInstance = new Chart(categoryCtx, {
      type: 'doughnut',
      data: {
        labels: ['Electronics', 'Clothing', 'Home & Garden', 'Beauty', 'Sports'],
        datasets: [{
          data: [35, 25, 18, 12, 10],
          backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        cutout: '75%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20 }
          },
          title: { display: true, text: 'Orders by Category', padding: { bottom: 20 } }
        }
      }
    });
  }

  // Spinner Simulation for Stats
  setTimeout(() => {
    $('.stat-value').each(function() {
      const val = $(this).data('val');
      $(this).html(val).hide().fadeIn('fast');
    });
  }, 1000);
});
