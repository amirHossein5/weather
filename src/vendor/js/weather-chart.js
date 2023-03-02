import ApexCharts from 'apexcharts';

const root = getComputedStyle(document.body);

var options = {
    series: [
        {
            data: [9, 6, 4, 2, 6, 4, 2, 6, 9, 6, 4, 2, 6, 4, 2, 6, 17, 12, 5, 0],
        },
    ],
    yaxis: {
        show: false,
    },
    xaxis: {
        axisTicks: {
            show: false,
        },
        // categories: ['Jan','fsdf,', 'Feb', 'Mar', 'Dec', 'fasdf', 'sadfs'],
        labels: {
            style: {
                colors: '#6c6c6c',
                fontWeight: '600',
            },
        },
    },
    tooltip: {
        enabled: false,
    },
    stroke: {
        width: 3,
    },
    chart: {
        height: 130,
        width: '100%',
        type: 'area',
        zoom: false,
        toolbar: {
            show: false,
        },
        events: {
            xAxisLabelClick: function (event, chartContext, config) {
                console.log(event.target.innerHTML);
            },
        },
    },
    // shape border top color
    colors: [root.getPropertyValue('--chart-border-top-color')],
    // shape color
    fill: {
        colors: [root.getPropertyValue('--chart-color')],
        type: 'solid',
    },
    dataLabels: {
        offsetY: -5,
        style: {
            colors: ['#6c6c6c'], // #9aa0a6
        },
        background: {
            enabled: false,
        },
    },
    grid: {
        show: false,
    },
    plotOptions: {
        area: {
            fillTo: 'end',
        },
    },
    responsive: [{
        breakpoint: 640,
        options: {
            chart: {
                height: 150,
            }
        },
    }, {
        breakpoint: 420,
        options: {
            chart: {
                height: 180,
            }
        },
    }],
};

export default function chart(querySelector) {
    return new ApexCharts(querySelector, options)
}
