$(function () {

    function shuffle(array) {
  	var m = array.length, t, i;


 	while (m) {

    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
   function makePieChart(data) {
        return {
            type: 'pie',
            name: 'Time Consumption (hours)',
            data: data,
            center: [150, 80],
            size: 200,
            showInLegend: true,
            dataLabels: {
                enabled: false
            }
        }
    }

   pieChartData = [{
                name: 'Facebook',
                y: 9,
                color: Highcharts.getOptions().colors[3]
            }, {
                name: 'Reddit',
                y: 9,
                color: Highcharts.getOptions().colors[4]
            }, {
                name: 'Google',
                y: 8,
                color: Highcharts.getOptions().colors[5]
            },
            {
                name: 'Twitter',
                y: 19,
                color: Highcharts.getOptions().colors[6]
            },
            {
                name: 'Tumblr',
                y: 22,
                color: Highcharts.getOptions().colors[7]
            }
     ];


    shuffle(pieChartData);

    data = {
        title: {
            text: 'Procrastination Stats (hours)'
        },
        xAxis: {
            categories: ['Facebook', 'Google', 'Reddit', 'Twitter', 'Tumblr']
        },
        labels: {
            items: [{
                html: 'Total Time on Websites',
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },

        series: [{
            type: 'column',
            name: 'Today',
            data: [2, 2, 1, 3, 0]
        }, {
            type: 'column',
            name: 'This Week',
            data: [3, 3, 3, 7, 4]
        }, {
            type: 'column',
            name: 'This Month',
            data: [4, 3, 5, 9, 6]
        }, {
            type: 'spline',
            name: 'Average',
            data: [3, 2.67, 3, 6.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }]
        // }, makePieChart(pieChartData)]
    };

    data1 = {
        title: {
            text: 'Procrastination Stats (hours)'
        },
        xAxis: {
            categories: ['Facebook', 'Google', 'Reddit', 'Twitter', 'Tumblr']
        },
        labels: {
            items: [{
                style: {
                    left: '50px',
                    top: '50px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },

        series: [makePieChart(pieChartData)]
    };

     $('#container').highcharts(data);
     $('#pie-chart').highcharts(data1);
});