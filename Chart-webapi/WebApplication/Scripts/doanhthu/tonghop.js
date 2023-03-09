
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

let category = []; let data = []



function GETDTTungMaHang(fromdate, todate) {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDTTungMaHang?fromdate=" + fromdate + '&todate=' + todate,
        dataType: "json",
        success: function (response) {
            document.getElementById("chart").innerHTML = "";
            console.log(response)
            category = []
            data = []
            response.map(x => {
                category.push(x.MaHang);
                data.push(x.DoanhThu);

            })

            CreateChart(category, data)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}

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

function GETDTHomNay(fromdate, todate) {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDTHomNay?fromdate=" + fromdate + '&todate=' + todate,
        dataType: "json",
        success: function (response) {
            console.log(response[0].DoanhThu, "response")
            if (response[0].DoanhThu == null) {
                $(".kt-widget4__item .value").html('0')
            }
            else {
                $(".kt-widget4__item .value").html(`${response[0].DoanhThu}`)
            }
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
GETDTHomNay(FormatDate(HomNay), FormatDate(HomNay))
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

function renderPie(data, idTag, title) {
    Highcharts.chart(idTag, {

        title: {
            text: title
        },

        //plotOptions: {
        //    series: {
        //        point: {
        //            events: {
        //                click: function (event) {
        //                    iD = this.name.split(" ")[2];
        //                    alert(iD)
        //                    let html = "<div></div>"
        //                    listMaHAngTheoThang.forEach(x => {
        //                        if (x.MaHang == iD) {
        //                            document.querySelector("#containertiendotheochuyen").innerHTML = html
        //                            getPieDetail(x.StyleID, dt.value.split("-")[1], dt.value.split("-")[0])
        //                            localStorage.setItem("StyleIDTienDo", x.StyleID)
        //                        }
        //                    })


        //                }
        //            }
        //        }
        //    }
        //},
        series: [{
            type: 'pie',
            allowPointSelect: true,
            data: data,

        }],

    });

}

function GETDTTungChuyen() {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDTTungChuyen",
        dataType: "json",
        success: function (response) {
            var num = 0;
            let results1 = []
            let results = []
            response.map(x => {
                results.push(x.linex, x.doanhthu)
                results1.push(results)
                results = []
                num++;
            })
            console.log(results1, "GETDTTungChuyen");
            renderPie(results1, pieDTTungChuyen,"Thống kê doanh thu của từng chuyền")
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
function GETDTTungMaHang() {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDTTungMaHang",
        dataType: "json",
        success: function (response) {
            var num = 0;
            let results1 = []
            let results = []
            response.map(x => {
                results.push(x.mahang, x.doanhthu)
                results1.push(results)
                results = []
                num++;
            })
            console.log(results1, "GETDTTungMaHang");
            renderPie(results1, pieDTTungMH, "Thống kê Top 10 doanh thu của từng mã hàng")
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}

GETDTTungChuyen();
GETDTTungMaHang();
$(document).ready(function () {

    GETDTTungMaHang(FormatDate(HomNay), FormatDate(HomNay))

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


