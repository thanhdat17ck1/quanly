﻿let fromdate = '';
let todate = '';
let boolCheck = false;
function getdskh(fromdate, todate) {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDSKH?fromdate=" + fromdate + '&todate=' + todate,
        dataType: "json",
        success: function (response) {
            let html = '';
            response.map(x => {
                html += `
                            <option value="${x.MaKhachHang}">${x.KhachHang}</option>
                        `
            })
            $("#slc_dskh").html(html)
            getChiTietDTKH(fromdate, todate, response[0]["MaKhachHang"])
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
function chart(value, name) {
    document.getElementById("chart").innerHTML = "";
    var options = {
        series: [{
            name: 'Servings',
            data: value
        }],
        annotations: {
            points: [{
                x: 'Bananas',
                seriesIndex: 0,
                label: {
                    borderColor: '#775DD0',
                    offsetY: 0,
                    style: {
                        color: '#fff',
                        background: '#775DD0',
                    },
                    text: 'Bananas are good',
                }
            }]
        },
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '50%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },

        grid: {
            row: {
                colors: ['#fff', '#f2f2f2']
            }
        },
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: name,
            tickPlacement: 'on'
        },
        yaxis: {
            title: {
                text: 'Servings',
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            },
        }
    };

    console.log(options, "renderchart")
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    //@*if (boolCheck == false) {

    //}
    //else {
    //    console.log(options.series, options.xaxis)
    //    chart.updateSeries(options.series);
    //    chart.updateOptions(options.xaxis);

    //}*@
            }
function getChiTietDTKH(fromdate, todate, makhachhang) {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETChiTietDTKH?fromdate=" + fromdate + '&todate=' + todate + '&makhachhang=' + makhachhang,
        dataType: "json",
        success: function (response) {
            let arrChiTietDTKH = []
            let value = [];
            let name = [];

            console.log(response, "arrChiTietDTKH")
            if (response != []) {
                response.map(x => {
                    value.push(x.DoanhThu)
                    name.push(x.DonVi)
                })
                console.log(value, name, "value, name")

                chart(value, name)
                console.log("value, name")
            }
            else {
                chart(value, name)
            }
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
$(function () {
    $('input[name="daterange"]').daterangepicker({
        "locale": {
            "format": "MM/DD/YYYY",
            "separator": " - ",
            "applyLabel": "Áp dụng",
            "cancelLabel": "Hủy",
            "fromLabel": "Từ",
            "toLabel": "Đến",
            "customRangeLabel": "Tùy chỉnh",
            "weekLabel": "W",
            "daysOfWeek": [
                "CN",
                "T2",
                "T3",
                "T4",
                "T5",
                "T6",
                "T7"
            ],
            "monthNames": [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12"
            ],
            "firstDay": 1
        },
        opens: 'left'
    }, function (start, end, label) {
        fromdate = start.format('YYYY-MM-DD');
        todate = end.format('YYYY-MM-DD');
        getdskh(fromdate, todate)
        boolCheck = false;
                });
});

$("#slc_dskh").on("change", function () {

    getChiTietDTKH(fromdate, todate, this.value)
    boolCheck = true;

})


