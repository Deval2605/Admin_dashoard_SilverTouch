// js/reports.js

$(document).ready(function() {
  // Date Range Tabs
  $('.date-tab').on('click', function() {
    $('.date-tab').removeClass('btn-primary text-white').addClass('btn-outline-secondary');
    $(this).removeClass('btn-outline-secondary').addClass('btn-primary text-white');
    
    if ($(this).data('range') === 'custom') {
      $('#customDateInputs').removeClass('d-none').addClass('d-flex');
    } else {
      $('#customDateInputs').addClass('d-none').removeClass('d-flex');
    }
  });

  // Export Report Button
  $('#exportReportBtn').on('click', function() {
    showToast('Report export started. Your file will be ready shortly.', 'success');
  });

  // Initialize Charts
  initReportsCharts();
});

function initReportsCharts() {
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = '#64748b';

  // 1. Monthly Revenue Area Chart
  const monthlyCtx = document.getElementById('monthlyRevenueChart');
  if (monthlyCtx) {
    const gradientThisYear = monthlyCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradientThisYear.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradientThisYear.addColorStop(1, 'rgba(99, 102, 241, 0.05)');

    const gradientLastYear = monthlyCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradientLastYear.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
    gradientLastYear.addColorStop(1, 'rgba(16, 185, 129, 0.05)');

    window.monthlyRevenueChartInstance = new Chart(monthlyCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'This Year',
            data: [28000, 35000, 31000, 42000, 38000, 51000, 47000, 62000, 55000, 71000, 68000, 84000],
            borderColor: '#6366f1',
            backgroundColor: gradientThisYear,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#6366f1',
            pointRadius: 4
          },
          {
            label: 'Last Year',
            data: [22000, 28000, 25000, 33000, 30000, 41000, 38000, 49000, 44000, 58000, 54000, 67000],
            borderColor: '#10b981',
            backgroundColor: gradientLastYear,
            borderWidth: 2,
            borderDash: [5, 5],
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#10b981',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top', align: 'end' }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { borderDash: [4, 4], color: 'rgba(0,0,0,0.05)' },
            ticks: {
              callback: function(value) { return '₹' + value / 1000 + 'k'; }
            }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // 2. Sales by Category - Horizontal Bar Chart
  const categoryBarCtx = document.getElementById('categoryBarChart');
  if (categoryBarCtx) {
    window.categoryBarChartInstance = new Chart(categoryBarCtx, {
      type: 'bar',
      data: {
        labels: ['Electronics', 'Clothing', 'Home & Garden', 'Beauty', 'Sports', 'Books'],
        datasets: [{
          label: 'Sales (₹)',
          data: [42000, 28000, 19000, 14000, 11000, 7000],
          backgroundColor: 'rgba(99, 102, 241, 0.8)',
          hoverBackgroundColor: '#6366f1',
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { borderDash: [4, 4], color: 'rgba(0,0,0,0.05)' },
            ticks: { callback: function(value) { return '₹' + value / 1000 + 'k'; } }
          },
          y: { grid: { display: false } }
        }
      }
    });
  }

  // 3. Order Status Distribution - Pie Chart
  const statusCtx = document.getElementById('orderStatusChart');
  if (statusCtx) {
    window.statusChartInstance = new Chart(statusCtx, {
      type: 'pie',
      data: {
        labels: ['Delivered', 'Processing', 'Shipped', 'Cancelled', 'Returned'],
        datasets: [{
          data: [58, 18, 14, 6, 4],
          backgroundColor: ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6'],
          borderWidth: 1,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' }
        }
      }
    });
  }

  // 4. Daily Active Users - Bar Chart
  const dauCtx = document.getElementById('dauChart');
  if (dauCtx) {
    const dauLabels = [];
    for(let i=1; i<=14; i++) dauLabels.push(`Day ${i}`);
    
    window.dauChartInstance = new Chart(dauCtx, {
      type: 'bar',
      data: {
        labels: dauLabels,
        datasets: [{
          label: 'Active Users',
          data: [1840, 2100, 1950, 2400, 2280, 1700, 1500, 2600, 2800, 2400, 2900, 3100, 2750, 3400],
          backgroundColor: function(context) {
            return context.dataIndex % 2 === 0 ? '#6366f1' : '#e0e7ff';
          },
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { borderDash: [4, 4], color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}
