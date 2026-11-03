document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. LIVE DATE LOGIC
    // ==========================================
    function updateDate() {
        const dateElement = document.getElementById('live-date');
        if (!dateElement) return;

        const now = new Date();
        
        // Format the date (e.g., "Oct 23, 2026")
        const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', dateOptions);
        
        // Format the day of the week (e.g., "Fri")
        const dayOptions = { weekday: 'short' };
        const formattedDay = now.toLocaleDateString('en-US', dayOptions);
        
        // Inject back into the span with the hidden tailwind class for mobile
        dateElement.innerHTML = `${formattedDate} <span class="text-slate-400 hidden sm:inline">(${formattedDay})</span>`;
    }

    // Set the date immediately on load
    updateDate();
    
    // Automatically check and update the date every hour
    setInterval(updateDate, 3600000);


    // ==========================================
    // 2. CHART.JS LOGIC
    // ==========================================
    const chartElement = document.getElementById('overviewChart');
    
    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        
        // Gradient for Service Income
        let serviceGradient = ctx.createLinearGradient(0, 0, 0, 300);
        serviceGradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
        serviceGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        // Gradient for Sales
        let salesGradient = ctx.createLinearGradient(0, 0, 0, 300);
        salesGradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
        salesGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [
                    {
                        label: 'Service Income',
                        data: [70000, 100000, 110000, 120000, 132000, 175000, 165000],
                        borderColor: '#3b82f6', // Tailwind blue-500
                        backgroundColor: serviceGradient,
                        borderWidth: 3,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#3b82f6',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Sales',
                        data: [45000, 75000, 85000, 95000, 98000, 135000, 132000],
                        borderColor: '#10b981', // Tailwind emerald-500
                        backgroundColor: salesGradient,
                        borderWidth: 3,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#10b981',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: false // We built a custom HTML legend above the chart
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleFont: { family: 'Inter', size: 13 },
                        bodyFont: { family: 'Inter', size: 13 },
                        padding: 12,
                        cornerRadius: 8,
                        boxPadding: 4,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '৳ ' + context.parsed.y.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 200000,
                        ticks: {
                            font: { family: 'Inter' },
                            color: '#64748b', // text-slate-500
                            callback: function(value) {
                                return value === 0 ? '0' : (value / 1000) + 'K';
                            },
                            stepSize: 50000
                        },
                        grid: {
                            color: '#f1f5f9', // border-slate-100
                            drawBorder: false,
                        }
                    },
                    x: {
                        ticks: {
                            font: { family: 'Inter' },
                            color: '#64748b'
                        },
                        grid: {
                            display: false,
                            drawBorder: false,
                        }
                    }
                }
            }
        });
    }
});
