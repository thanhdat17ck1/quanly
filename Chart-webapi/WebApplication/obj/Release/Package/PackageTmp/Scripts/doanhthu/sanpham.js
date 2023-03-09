
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

$(document).ready(function () {
    
    GETDTTungMaHang(FormatDate(HomNay), FormatDate(HomNay))

    $("#slc_date").on("change", function () {
        console.log($("#slc_theo").val(), $("#slc_date").val())
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