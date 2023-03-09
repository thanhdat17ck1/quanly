var options1 = {
    series: [
        {
            name: "Net Profit",
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
            name: "Revenue",
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
    ],
    chart: {
        type: "bar",
        height: 350
    },
    plotoptions1: {
        bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
    },
    xaxis: {
        categories: [
            "Apples",
            "Strawberries",
            "Pineapples",
            "Pears",
            "Tangerines"
        ],
        labels: {
            style: {
                fontSize: "11px",
                cssClass: ".apexcharts-margin"
            },
            hideOverlappingLabels: false,
            show: true,
            rotate: 0,
            rotateAlways: false,
            minHeight: 100,
            maxHeight: 2000
        }
    },
    yaxis: {
        title: {
            text: "Số lượng cắt năm"
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val;
            }
        }
    }
};
console.log(options1.xaxis.categories, 'aaaaaaa');
options1.series = [];
options1.xaxis.categories = [];
var d = new Date();
var _YearGB = parseInt(d.getFullYear());


var dp = $("#datepicker").datepicker({
    format: "yyyy",
    viewMode: "years",
    minViewMode: "years",
    autoclose: true //to close picker once year is selected
});


dp.on('changeYear', function (e) {
    options1.series = [];
    options1.xaxis.categories = [];
    setTimeout(function () { getCatYear(document.getElementById("datepicker").value, "2022-10-11") },1500)
});

document.getElementById('datepicker').addEventListener('change', (event) => {
    console.log(document.getElementById("datepicker").value)
});


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function getCatYear(year, datetime) {
    $.ajax({
        type: "GET",
        url: "/api/Cat/GetCatBy?year=" + year + "&&action=GetCatYear&&dt=" + datetime,
        dataType: "json",
        success: function (response) {

            var dataoption = [];
            var num = 0;
            response.forEach(x => {
                num++;
                dataoption.push(x.LK_Cat);
            })
            response.forEach(x => {
                options1.xaxis.categories.push(x.MaHang)
            })
            options1.xaxis.categories = options1.xaxis.categories.filter(onlyUnique);

            options1.series.push({
                name: year.toString(),
                data: dataoption,
            })
            document.querySelector("#chart2").innerHTML = '';
            var chart = new ApexCharts(document.querySelector("#chart2"), options1);
            chart.render();
        },
        error: function (xhr, status, error) {
            console.error(status + ": " + error);
        }
    });
}

console.log(d.getFullYear,"ddđ")
getCatYear(parseInt(d.getFullYear()), "2022-10-31");

let category = []; let data = []
var results = [];
var results1 = [];
getPieCatAll();
function getPieCatAll() {
    $.ajax({
        type: "GET",
        url: "/api/Cat/GetCatBy?year=" + "1" + "&&action=GetCatAll&&dt=" + "2022-01-01",
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            response.map(x => {
                results.push(`${x.MaHang}-${x.SeaSon}`, x.LK_Cat)
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


function renderPie(data) {
    Highcharts.chart('container-catall', {

        title: {
            text: 'Lũy kế cắt'
        },

        //xAxis: {
        //    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //},
        plotoptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            // window.open(event.point.name)
                            //iD = this.id.split("-")[2];
                            ////console.log(iD,"iD")
                            //let html = "<div></div>"
                            //document.querySelector("#apex-chart").innerHTML = html
                            //getPieDetail(iD)

                        }
                    }
                }

            }
        },
        series: [{
            type: 'pie',
            allowPointSelect: true,
            //keys: ['name', 'y', 'selected', 'sliced'],
            data: data,
            //   showInLegend: true
        }],

    });

}