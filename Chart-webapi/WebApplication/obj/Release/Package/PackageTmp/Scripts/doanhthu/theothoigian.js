let namHienTai = '2023'
let namDangChon = '2023'
let ThangChon = '';

let today = new Date();
let day = today.getDate();
let day1 = today.getDate() - 1;
let month = today.getMonth() + 1; // lưu ý: tháng trả về bắt đầu từ 0, nên cần cộng thêm 1
let year = today.getFullYear();
let HomNay = FormatDate1(today)

let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
let HomQua = FormatDate1(yesterday)

let SevendayAgo = new Date(today);
SevendayAgo.setDate(today.getDate() - 7);
let TuanTruoc = FormatDate1(SevendayAgo)

let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let ThangNay = FormatDate1(firstDayOfMonth)
//console.log(ThangNay);

let firstDayOfMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, 1);
let NgayDauThangTruoc = FormatDate1(firstDayOfMonthAgo)

let lastDayOfLastMonthAgo = new Date(today.getFullYear(), today.getMonth(), 0);
let NgayCuoiThangTruoc = FormatDate1(lastDayOfLastMonthAgo)
function FormatDate1(date) {
    return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function FormatDate(date) {
    // Tạo đối tượng Date từ chuỗi ngày tháng năm ban đầu
    let dateObject = new Date(date.split('/').join('-'));

    // Định dạng lại ngày tháng năm thành mm-dd-yyyy
    return (dateObject.getMonth() + 1).toString().padStart(2, '0') + '-' + dateObject.getDate().toString().padStart(2, '0') + '-' + dateObject.getFullYear().toString();
    //alert(formattedDate)
}
function DoanhThuTungThang(year) {
    let value = []
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDThangTrongNam?year=" + year,
        dataType: "json",
        success: function (response) {
            $("#chart1").html('')
            response.map(x => {
                value.push(x.DoanhThu)
            })
            var data = value;
            let TongDoanhThu = 0;
            let Doanhthutrungbinh = 0
            var categories = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

            var newData = data.map(function (value) {
                TongDoanhThu += value;
                return value === null ? "NA" : value;
            });
            const USDollar = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            TongDoanhThu = USDollar.format(TongDoanhThu)
            Doanhthutrungbinh = TongDoanhThu
            console.log(TongDoanhThu, "value")

            var options = {
                chart: {
                    type: 'bar',
                    height: 350,
                    events: {
                        dataPointSelection: (event, chartContext, config) => {
                            ThangChon = config.w.config.xaxis.categories[config.dataPointIndex].split(" ")[1];
                            //console.log(ThangChon.split(" ")[1], namDangChon);

                            GETDTTungChuyen(ThangChon, namDangChon);
                            GETDTTungMaHang(ThangChon, namDangChon);
                        }
                    }
                },
                series: [{
                    data: newData
                }],
                xaxis: {
                    categories: categories
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                series: [{
                    data: data,
                    name: 'Giá trị',
                    type: 'bar'
                }]
            }
            
            $("#tongdoanhthu").html(`Tổng doanh thu: ${TongDoanhThu}`)
            var chart = new ApexCharts(document.querySelector("#chart1"), options);
            chart.render();

        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function GETDTTungChuyen(month, year) {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDTTungChuyenTheoThang?month=" + month + '&year=' + year,
        dataType: "json",
        success: function (response) {
            var num = 0;
            let results1 = []
            let results = []
            response.map(x => {
                if (x.doanhthu > 0) {
                    results.push(x.Linex, x.doanhthu)
                    results1.push(results)
                    results = []
                    num++;
                }
               
            })
            console.log(results1, "GETDTTungChuyen");
            renderPie(results1, pieDTTungChuyen, `Doanh thu của từng chuyền ${month} - ${year}`)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
function GETDTTungMaHang(month, year) {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDTTungMaHangTheoThang?month=" + month + '&year=' + year,
        dataType: "json",
        success: function (response) {
            var num = 0;
            let results1 = []
            let results = []
            response.map(x => {
                if (x.doanhthu > 0) {
                    results.push(x.mahang, x.doanhthu)
                    results1.push(results)
                    results = []
                    num++;
                }
                
            })
            console.log(results1, "GETDTTungMaHang");
            if (results1 == []) {

            }
            renderPie(results1, pieDTTungMH, `Doanh thu của từng mã hàng ${month} - ${year}`)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}

function renderPie(data, idTag, title) {
    Highcharts.chart(idTag, {

        title: {
            text: title
        },
        series: [{
            type: 'pie',
            allowPointSelect: true,
            data: data,

        }],

    });

}
GETDTTungChuyen('3','2022');
GETDTTungMaHang('3','2022');

$("#slc_year").on("change", function () {
    namDangChon = $(this).val()
    DoanhThuTungThang(namDangChon);

})
DoanhThuTungThang(namHienTai);

function GETDTTheoSoLuong(fromdate, todate) {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDTTheoSoLuong?fromdate=" + fromdate + '&todate=' + todate,
        dataType: "json",
        success: function (response) {
            document.getElementById("chart").innerHTML = "";
            console.log(response)
            category = []
            data = []
            response.map(x => {
                category.push(x.MaHang);
                data.push(x.SanPham);

            })

            CreateChart(category, data)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
function CreateChart(category, data) {
    let check0 = false;
    console.log(category, data)
    data.map(x => {
        if (x != 0) {
            check0 = true;
        }
    })

    if (check0 == true) {
        var chartOptions = {
            chart: {
                renderTo: 'chart'
            },
            title: {
                text: ''
            },
            xAxis: {
                reversed: false,
                categories: category
            },
            series: [{
                data: data,
                name: 'Giá trị',
                type: 'bar'
            }]
        }

        var chart = new Highcharts.Chart(chartOptions);
    }
    else {
        document.getElementById("chart").innerHTML = `<h3 class="text-center">không có dữ liệu</h3>`
    }
}

$(document).ready(function () {

    //GETDTTungMaHang(FormatDate(HomNay), FormatDate(HomNay))

    $("#slc_date").on("change", function () {
        console.log($("#slc_theo").val(), $("#slc_date").val())
        if ($("#slc_theo").val() == 1) {
            if ($("#slc_date").val() == 1) {
                $(".kt-portlet__head-title.dtmh span").html("<span> HÔM NAY</span>")
                GETDTTungMaHang(FormatDate(HomNay), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 2) {
                $(".kt-portlet__head-title.dtmh span").html("<span> HÔM QUA</span>")
                GETDTTungMaHang(FormatDate(HomQua), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 3) {
                $(".kt-portlet__head-title.dtmh span").html("<span> 7 NGÀY QUA</span>")
                GETDTTungMaHang(FormatDate(TuanTruoc), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 4) {
                $(".kt-portlet__head-title.dtmh span").html("<span> THÁNG NÀY</span>")
                GETDTTungMaHang(FormatDate(ThangNay), FormatDate(HomNay))
            }
            else {
                $(".kt-portlet__head-title.dtmh span").html("<span> THÁNG TRƯỚC</span>")
                GETDTTungMaHang(FormatDate(NgayDauThangTruoc), FormatDate(NgayCuoiThangTruoc))
            }
        }
        else {
            if ($("#slc_date").val() == 1) {
                $(".kt-portlet__head-title.dtmh span").html("<span> HÔM NAY</span>")
                GETDTTheoSoLuong(FormatDate(HomNay), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 2) {
                $(".kt-portlet__head-title.dtmh span").html("<span> HÔM QUA</span>")
                GETDTTheoSoLuong(FormatDate(HomQua), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 3) {
                $(".kt-portlet__head-title.dtmh span").html("<span> 7 NGÀY QUA</span>")
                GETDTTheoSoLuong(FormatDate(TuanTruoc), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 4) {
                $(".kt-portlet__head-title.dtmh span").html("<span> THÁNG NÀY</span>")
                GETDTTheoSoLuong(FormatDate(ThangNay), FormatDate(HomNay))
            }
            else {
                $(".kt-portlet__head-title.dtmh span").html("<span> THÁNG TRƯỚC</span>")
                GETDTTheoSoLuong(FormatDate(NgayDauThangTruoc), FormatDate(NgayCuoiThangTruoc))
            }
        }
    })
    $("#slc_theo").on("change", function () {
        if ($("#slc_theo").val() == 1) {
            if ($("#slc_date").val() == 1) {
                GETDTTungMaHang(FormatDate(HomNay), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 2) {
                GETDTTungMaHang(FormatDate(HomQua), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 3) {
                GETDTTungMaHang(FormatDate(TuanTruoc), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 4) {
                GETDTTungMaHang(FormatDate(ThangNay), FormatDate(HomNay))
            }
            else {
                GETDTTungMaHang(FormatDate(NgayDauThangTruoc), FormatDate(NgayCuoiThangTruoc))
            }
        }
        else {
            if ($("#slc_date").val() == 1) {
                GETDTTheoSoLuong(FormatDate(HomNay), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 2) {
                GETDTTheoSoLuong(FormatDate(HomQua), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 3) {
                GETDTTheoSoLuong(FormatDate(TuanTruoc), FormatDate(HomNay))
            }
            else if ($("#slc_date").val() == 4) {
                GETDTTheoSoLuong(FormatDate(ThangNay), FormatDate(HomNay))
            }
            else {
                GETDTTheoSoLuong(FormatDate(NgayDauThangTruoc), FormatDate(NgayCuoiThangTruoc))
            }
        }
    })


});