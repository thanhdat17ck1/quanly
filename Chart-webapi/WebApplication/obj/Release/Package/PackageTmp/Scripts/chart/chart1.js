let category = []; let data = []
var results = [];
var results1 = [];
let iD = 1;

function getPie() {
    $.ajax({
        type: "GET",
        url: "/api/Todo/GetTodo",
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            response.map(x => {
                results.push(x.name, x.value)
                results1.push(results)
                results = []
            })

            renderPie(results1);
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function getPieDetail(id) {
    $.ajax({
        type: "GET",
        url: "/api/Todo/GetDetailTodo?id=" + id,
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            category = []
            data = []
            response.map(x => {
                category.push(x.name);
                data.push(x.value);

            })
            console.log(data, "data")
            renderChart(data)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function GetDoanhThu() {
    $.ajax({
        type: "GET",
        url: "/api/Todo/GetDoanhThu",
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            //response.map(x => {
            //    results.push(x.name, x.value)
            //    results1.push(results)
            //    results = []
            //})

            //renderPie(results1);
            let data = response[0];
            let html = `<div class="item">
                            <div>
                                <p>Doanh số hôm nay</p>
                                <span>${data.doanhThuHomNay}</span>
                            </div>
                            <div>
                                <p>Doanh số hôm qua</p>
                                <span>${data.doanhThuHomQua}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div>
                                <p>Doanh số tuần này</p>
                                <span>${data.doanhSoTuanNay}</span>
                            </div>
                            <div>
                                <p>Doanh số tuần trước</p>
                                <span>${data.DoanhSoTuanTruoc}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div>
                                <p>Doanh số tháng này</p>
                                <span>${data.DoanhSoThangNay}</span>
                            </div>
                            <div>
                                <p>Doanh số tháng trước</p>
                                <span>${data.DoanhSoThangTruoc}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div>
                                <p>Doanh số năm này</p>
                                <span>${data.DoanhSoNamNay}</span>
                            </div>
                            <div>
                                <p>Doanh số năm trước</p>
                                <span>${data.DoanhSoNamTruoc}</span>
                            </div>
                        </div>`
            $(".doanhthu").html(html)
            console.log(response, "GetDoanhThu")
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}
GetDoanhThu();
setInterval(GetDoanhThu, 10000)
//getPie()
//getPieDetail(1)
function renderChart(data1) {
    var options = {
        chart: {
            width: "100%",
            height: 380,
            type: "bar"
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        series: [
            {
                data: data1
            }
        ],
        xaxis: {
            categories: category
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return (
                    '<div class="arrow_box">' +
                    "<span>" +
                    w.globals.labels[dataPointIndex] +
                    ": " +
                    series[seriesIndex][dataPointIndex] +
                    "</span>" +
                    "</div>"
                );
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#apex-chart"), options);


    chart.render();
}

function renderPie(data) {
    Highcharts.chart('container', {

        title: {
            text: 'Top 3 món ăn bán chạy'
        },

        //xAxis: {
        //    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //},
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            // window.open(event.point.name)
                            iD = this.id.split("-")[2];
                            //console.log(iD,"iD")
                            let html = "<div></div>"
                            document.querySelector("#apex-chart").innerHTML = html
                            getPieDetail(iD)

                        }
                    }
                }

            },
            pie: {
                size: '100%',
                cursor: 'pointer',
                data: data
            }
        },
        series: [{
            type: 'pie',
            allowPointSelect: true,
            //keys: ['name', 'y', 'selected', 'sliced'],
            //data: data,
            //   showInLegend: true
            dataLabels: {
                verticalAlign: 'top',
                enabled: true,
                color: '#000000',
                connectorWidth: 1,
                distance: -30,
                connectorColor: '#000000',
                formatter: function () {
                    return Math.round(this.percentage) + ' %';
                }
            }
            
        },
            {
                type: 'pie',
                name: 'Asset Allocation',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorWidth: 1,
                    distance: 30,
                    connectorColor: '#000000',
                    formatter: function () {
                        return '<b>' + this.point.name;
                    }
                }
            }
        ],

    });

}

function GetTop3banchay() {
    $.ajax({
        type: "GET",
        url: "/api/Todo/GetTop3banchay",
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            results = []
            response.map(x => {
                results.push(x.name, x.total)
                results1.push(results)
                results = []
            })
            renderPie(results1)
            console.log(response, results1,"GetTop3banchay")
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
GetTop3banchay()


