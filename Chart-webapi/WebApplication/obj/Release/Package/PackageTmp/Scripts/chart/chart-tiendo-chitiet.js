let category = []; let data = []
var results = [];
var results1 = [];
let iD = 1;
var dtiendo = new Date();

var dt = document.getElementById("dt");
var de = document.getElementById("de");
de.value = formatDate3(dtiendo);
dt.value = formatDate3(dtiendo.setFullYear(dtiendo.getFullYear() - 1));

function formatDate(date) {
    var day = new Date(date).getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = new Date(date).getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = new Date(date).getFullYear();
    return month + "-" + day + "-" + year;
}
function formatDate3(date) {
    var day = new Date(date).getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = new Date(date).getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = new Date(date).getFullYear();
    return year + "-" + month + "-" + day;
}

const get_day_of_time = (d1, d2) => {
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();
    return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
};

dt.addEventListener('change', function () {
    getPie(formatDate(dt.value), formatDate(de.value))
});

de.addEventListener('change', function () {
    getPie(formatDate(dt.value), formatDate(de.value))

});

document.getElementById("selecttiendo").addEventListener("change", function () {
    var selected = document.getElementById("selecttiendo").value;
    if (selected == "Cat") {
        GetTienDoCat(localStorage.getItem("ChuyenTienDo"), dt.value, de.value);
    } else if (selected == "SLKH") {
        getPieDetail(localStorage.getItem("ChuyenTienDo"), dt.value, de.value);
    } else if (selected == "Ui") {
        GetTienDoUi(localStorage.getItem("ChuyenTienDo"), dt.value, de.value);
    } else if (selected == "BTP") {
        GetTienDoBTP(localStorage.getItem("ChuyenTienDo"), dt.value, de.value);
    } else {
        GetTienDoDG(localStorage.getItem("ChuyenTienDo"), dt.value, de.value);
    }
})

function getPie(dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetChuyenTienDo?dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            results1 = []
            var num = 0;
            response.map(x => {
                results.push("Chuyền " + x.Chuyen, x.SLKH)
                results1.push(results)
                results = []
                num++;
            })
            if (num > 0) {
                renderPie(results1);
                if (num > 0) {
                    getPieDetail(response[0].Chuyen, dt, de);
                    document.getElementById("chuyentiendophantich").innerHTML = response[0].Chuyen;
                    localStorage.setItem("ChuyenTienDo", response[0].Chuyen)
                }
            } else {
                alert("không đủ số liệu để phân tích,vui lòng chọn mốc thời gian khác");
            }


        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}



function getPieDetail(id, dt, de) {
    document.getElementById("selecttiendo").value = "SLKH"
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetChiTietChuyenTienDo?line=" + id + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            category = []
            data = []
            response.map(x => {
                category.push(x.MaHang);
                data.push(x.SLKH);
            })
            renderChart(data)
            GetChiTietChuyenNgayGiao(id, dt, de)
            GetAllChiTietChuyenNgayGiao(dt, de)
            GetMoTaPhanTichMaHang(dt, de)

        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function GetChiTietChuyenNgayGiao(id, dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetChiTietChuyenNgayGiao?line=" + id + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            var series = []
            var xasix = []
            console.log(response, "response")
            response.forEach(x => {
                let time = get_day_of_time(new Date(x.NgayTao), new Date(x.NgayGH))
                series.push(
                    time
                )
                xasix.push(x.MaHang.split('-')[0] + ' - PO:' + x.PO)
            })
            renderLineChart(response, series, xasix);
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}


function GetAllChiTietChuyenNgayGiao(dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetChiTietChuyenNgayGiao?line=" + "all" + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            var listAll = [];
            response.forEach(x => {
                let time = get_day_of_time(new Date(x.NgayTao), new Date(x.NgayGH))
                listAll.push({
                    "Chuyen": x.Chuyen,
                    "MaHang": x.MaHang,
                    "Time": time
                }
                )
            })

            //Mã hàng thế mạnh 
            var mhtmList = [];
            var stringmahangtoichuyen = '';
            listAll.forEach(k => {
                if (k.MaHang.includes(localStorage.getItem('mhtm'))) {
                    mhtmList.push(k)
                }
            })

            let templist = [];
            templist = arrayMaxMHTM(mhtmList);

            var donemhtmList = mhtmList.filter(function (task) {
                return task.Time >= templist[0].Time;
            });
            var doneListALl = listAll.filter(function (task) {
                return task.Chuyen == localStorage.getItem("ChuyenTienDo");
            });

            if (donemhtmList.length > 3) {
                stringmahangtoichuyen = donemhtmList[0].Chuyen;
                for (var i = 1; i < 3; i++) {
                    stringmahangtoichuyen += "," + donemhtmList[i].Chuyen
                }
            } else if (donemhtmList.length > 0) {
                stringmahangtoichuyen = donemhtmList[0].Chuyen;
                for (var i = 1; i < donemhtmList.length; i++) {
                    stringmahangtoichuyen += "," + donemhtmList[i].Chuyen
                }
            }
            var maxChuyen = arrayMaxChuyen(listAll);
            var maxChuyentiendo = arrayMaxChuyen(doneListALl);

            document.getElementById("mahangtoichuyen").innerHTML = ' hiện tại là mặt hàng thế mạnh,các chuyền xử lý tốt mặt hàng này bao gồm :' + stringmahangtoichuyen + ',có thể chuyển mặt hàng tới một trong các chuyền trên để đạt năng suất cao hơn';
            document.getElementById("mhtmtoichuyen").innerHTML = localStorage.getItem("mhtm");

            document.getElementById("chuyennn").innerHTML = "Chuyền " + maxChuyen[0].Chuyen + " Mã Hàng :" + maxChuyen[0].MaHang + ": " + maxChuyen[0].Time + " ngày"
            document.getElementById("chuyennntiendo").innerHTML = "Mã Hàng :" + maxChuyentiendo[0].MaHang + ": " + maxChuyentiendo[0].Time + " ngày"


        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function arrayMaxChuyen(arr) {
    var len = arr.length, max = Infinity;
    var obj = [];
    while (len--) {
        if (arr[len].Time < max) {
            max = arr[len].Time;
            obj = [];
            obj.push(arr[len])
        }
    }
    return obj;
};


function arrayMaxMHTM(arr) {
    var len = arr.length, max = -Infinity;
    var obj = [];
    while (len--) {
        if (arr[len].Time > max) {
            max = arr[len].Time;
            obj = [];
            obj.push(arr[len])
        }
    }
    return obj;
};

function arrayMax(arr) {
    var len = arr.length, max = -Infinity;
    var obj = [];
    while (len--) {
        if (arr[len].SLKH > max) {
            max = arr[len].SLKH;
            obj = [];
            obj.push(arr[len])
        }
    }
    return obj;
};
function GetMoTaPhanTichMaHang(dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetMoTa?action=GetMaHangTotal&&line=" + "all" + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            var maxMaHang = arrayMax(response);

            document.getElementById("mhtm").innerHTML = maxMaHang[0].MaHang + ": " + maxMaHang[0].SLKH
            localStorage.setItem("mhtm", maxMaHang[0].MaHang);
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function GetTienDoCat(chuyen, dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetMoTa?action=GetTienDoCatMaHang&&line=" + chuyen + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            category = []
            data = []
            response.map(x => {
                category.push(x.MaHang);
                data.push(x.SLKH);
            })
            console.log(data, "datacat")
            renderChart(data)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function GetTienDoBTP(chuyen, dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetMoTa?action=GetTienDoBTPMaHang&&line=" + chuyen + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            category = []
            data = []
            response.map(x => {
                category.push(x.MaHang);
                data.push(x.LuyKe_BTP);
            })
            console.log(data, "dataBTP")
            renderChart(data)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function GetTienDoUi(chuyen, dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetMoTa?action=GetTienDoUiMaHang&&line=" + chuyen + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            category = []
            data = []
            response.map(x => {
                category.push(x.MaHang);
                data.push(x.SLUI);
            })
            console.log(data, "dataUi")
            renderChart(data)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}
function GetTienDoDG(chuyen, dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetMoTa?action=GetTienDoDongGoiMaHang&&line=" + chuyen + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            category = []
            data = []
            response.map(x => {
                category.push(x.MaHang);
                data.push(x.GX_LK);
            })
            console.log(data, category, "dataGX")
            renderChart(data)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

getPie(dt.value, de.value)
function renderChart(data1) {
    document.getElementById("apex-chart-tiendo").innerHTML = '';

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
    var chart = new ApexCharts(document.querySelector("#apex-chart-tiendo"), options);
    chart.render();
}

function renderPie(data) {
    Highcharts.chart('containertiendo', {

        title: {
            text: 'Sơ đồ chuyền - SLKH'
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            iD = this.name.split(" ")[1];
                            let html = "<div></div>"
                            document.querySelector("#apex-chart-tiendo").innerHTML = html
                            getPieDetail(iD, formatDate(dt.value), formatDate(de.value))
                            document.getElementById("chuyentiendophantich").innerHTML = iD;
                            localStorage.setItem("ChuyenTienDo", iD)

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
function renderLineChart(data, series, xaxis) {
    var options = {
        series: [{
            name: "Số ngày",
            data: series
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Tiến độ thực hiện theo chuyền - (mã hàng)',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: xaxis,
        }
    };

    var chart = new ApexCharts(document.querySelector("#linecharttiendo"), options);
    chart.render();

}