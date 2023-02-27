

let categoryDG = []; let dataDG = []
var resultsDG = [];
var resultsDG1 = [];
getPieDGAll();
var d = new Date();
function getPieDGAll() {
    $.ajax({
        type: "GET",
        url: "/api/DongGoi/GetDongGoiBy?year=" + "1" + "&&action=GetDGAll&&dt=" + "2022-01-01",
        dataType: "json",
        success: function (response) {
            response.map(x => {
                resultsDG.push(`${x.MaHang}-${x.SeaSon}`, x.LKDongThung)
                resultsDG1.push(resultsDG)
                resultsDG = []
            })
            renderPieDG(resultsDG1);
        },
        error: function (xhr, status, error) {
            console.error(status + ": " + error);
        }
    });

}



function renderPieDG(data) {
    Highcharts.chart('container-dgall', {

        title: {
            text: 'Lũy kế đóng gói'
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                        }
                    }
                }

            }
        },
        series: [{
            type: 'pie',
            allowPointSelect: true,
            data: data,
        }],

    });

}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function checkIsActive(array, doc) {
    return array.filter(x => {
        if (x > 5) {
            console.log(true);
            return true;
        }
    })
}

function check_arr(element, arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].MaHang === element) {
            count++;
            break
        }
    }
    return (count > 0) ? true : false
}

getDGPerYear(parseInt(d.getFullYear()));
function getDGPerYear(year) {
    $.ajax({
        type: "GET",
        url: "/api/DongGoi/GetDongGoiBy?year=" + year + "&&action=getDGPerYear&&dt=" + "2022-01-01",
        dataType: "json",
        success: function (response) {
            var countries = [];
            var data1 = [];
            var data2 = [];

            var data1Temp = [];
            var data2Temp = [];

            response.forEach(x => {
                if (x.Year == year) {
                    data1Temp.push(x)
                }
                else {
                    data2Temp.push(x)
                }
            })
            response.map(x => {
                countries.push(`${x.MaHang}`)
                countries = countries.filter(onlyUnique);
            })

            for (var i = 0; i < countries.length; i++) {
                if (check_arr(countries[i], data1Temp) == false) {
                    data1Temp.push({
                        "LKDongThung": 0,
                        "MaHang": countries[i],
                        "MaLenh": "",
                        "SeaSon": "",
                        "Year": parseInt(year)
                    })
                }
            }


            for (var i = 0; i < countries.length; i++) {
                if (check_arr(countries[i], data2Temp) == false) {
                    data2Temp.push({
                        "LKDongThung": 0,
                        "MaHang": countries[i],
                        "MaLenh": "",
                        "SeaSon": "",
                        "Year": parseInt(year - 1)
                    })
                }
            }



            console.log(data1Temp, data2Temp, 'datatemp')

            data1Temp.forEach(x => {
                data1.push(x.LKDongThung)
            })
            data2Temp.forEach(x => {
                data2.push(x.LKDongThung)
            })


            selectJson(countries, data1, data2)
        },
        error: function (xhr, status, error) {
            console.error(status + ": " + error);
        }
    });

}

function selectJson(countries, d1, d2) {

    var options = {
        series: [{
            data: d1
        }, {
            data: d2
        }],
        chart: {
            type: 'bar',
            height: 430
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: countries,
        },

    };
    var chart = new ApexCharts(document.querySelector("#chart-ssdg"), options);
    chart.render();
};
