window.onload = function () {
    
    fetch('http://localhost:2031/failed-deployments')
        .then(response => response.json())
        .then(data => {
            console.log('Failed Deployments Data:', data);
            if (Array.isArray(data) && data.length > 0) {
                createFailedDeploymentsChart(data);
            } else {
                console.error('No data found for Failed Deployments');
            }
        })
        .catch(error => console.error('Error fetching data for Failed Deployments:', error));

    
    fetch('http://localhost:2090/failed-builds')
        .then(response => response.json())
        .then(data => {
            console.log('Failed Builds Data:', data);
            if (Array.isArray(data) && data.length > 0) {
                createFailedBuildsChart(data);
            } else {
                console.error('No data found for Failed Builds');
            }
        })
        .catch(error => console.error('Error fetching data for Failed Builds:', error));
};


function createFailedDeploymentsChart(data) {
    var chart = am4core.create("failedDeploymentsChart", am4charts.XYChart);
    chart.data = data;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Number of Failed Deployments";
    valueAxis.renderer.minWidth = 50;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "label";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "y";
    series.dataFields.categoryY = "label";
    series.name = "Failed Deployments";
    series.tooltipText = "{categoryY}: {valueX} failed deployments";

    chart.cursor = new am4charts.XYCursor();
}

function createFailedBuildsChart(data) {
    var chart = am4core.create("failedBuildsChart", am4charts.XYChart);
    chart.data = data;

  
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Number of Failed Builds";
    valueAxis.renderer.minWidth = 50;

   
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "label";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "y";
    series.dataFields.categoryY = "label";
    series.name = "Failed Builds";
    series.tooltipText = "{categoryY}: {valueX} failed builds";

    chart.cursor = new am4charts.XYCursor();
}
