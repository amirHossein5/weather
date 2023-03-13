const root = getComputedStyle(document.body);

export let options = {
    series: [
        {
            data: [7, 4, 6],
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
            // show: false,
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
        width: '150px',
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
        padding: {
            left: 0,
            right: 0,
        },
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

