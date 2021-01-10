google.load('visualization', '1', {'packages':['corechart', 'bar']});
google.setOnLoadCallback(drawChartTrump);
google.setOnLoadCallback(drawChartBiden);

function drawChartTrump() {
    $.get('/trump', function(response) {
        console.log(response);
        var chartData = [];
        for(var idx = 0; idx < response.length; ++idx) {
            var item = response[idx];
            chartData.push([item.tag, item.value]);
        }

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'tag');
        data.addColumn('number', 'value');
        data.addRows(chartData);

        var options = {
            title: 'Sentiment analysis results of Donald J. Trump.'
        };

        //create and draw the chart from DIV
        var chart = new google.visualization.PieChart(document.getElementById('piechartTrump'));
        chart.draw(data, options);

    }, 'json');

}

function drawChartBiden() {
    $.get('/biden', function(response) {
        console.log(response);
        var chartData = [];
        for(var idx = 0; idx < response.length; ++idx) {
            var item = response[idx];
            chartData.push([item.tag, item.value]);
        }

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'tag');
        data.addColumn('number', 'value');
        data.addRows(chartData);

        var options = {
            title: 'Sentiment analysis results of Joe. Biden.'
        };

        //create and draw the chart from DIV
        var chart = new google.visualization.PieChart(document.getElementById('piechartBiden'));
        chart.draw(data, options);

    }, 'json');

}

// interval for adding new data every 250ms
let index = 0;
setInterval(function() {
    drawChartTrump();
    drawChartBiden();
    index++;
}, 300000);

