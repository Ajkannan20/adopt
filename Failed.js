window.onload = function () {
    // Create Failed Deployments Chart
    fetch('http://localhost:2031/failed-deployments')
        .then(response => response.json())
        .then(data => {
            var chart = am4core.create("failedDeploymentsChart", am4charts.XYChart);
            chart.data = data;

            // Value Axis
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Number of Failed Deployments";
            valueAxis.renderer.minWidth = 50;

            // Category Axis
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "label";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

            // Series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = "y";
            series.dataFields.categoryY = "label";
            series.name = "Failed Deployments";
            series.tooltipText = "{categoryY}: {valueX} failed deployments";

            // Cursor
            chart.cursor = new am4charts.XYCursor();
        })
        .catch(error => console.error('Error fetching data for Failed Deployments:', error));

    // Create Failed Builds Chart
    fetch('http://localhost:2090/failed-builds')
        .then(response => response.json())
        .then(data => {
            var chart = am4core.create("failedBuildsChart", am4charts.XYChart);
            chart.data = data;

            // Value Axis
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Number of Failed Builds";
            valueAxis.renderer.minWidth = 50;

            // Category Axis
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "label";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

            // Series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = "y";
            series.dataFields.categoryY = "label";
            series.name = "Failed Builds";
            series.tooltipText = "{categoryY}: {valueX} failed builds";

            // Cursor
            chart.cursor = new am4charts.XYCursor();
        })
        .catch(error => console.error('Error fetching data for Failed Builds:', error));
}
