let category = []; let data = []
var results = [];
var results1 = [];
let iD = 1;
var dtiendo = new Date("01-02-2023");
var listMaHAngTheoThang = [];
var listKH = [];

var dt = document.getElementById("dt");
var selectbox = document.getElementById("selectkh");
var selectboxchuyen = document.getElementById("selectchuyen")
dt.value = formatDateMonthValid(dtiendo);

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
function formatDateMonthValid(date) {
    var month = new Date(date).getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = new Date(date).getFullYear();
    return year + "-" + month;
}

const get_day_of_time = (d1, d2) => {
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();
    return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
};

dt.addEventListener('change', function () {
    getPie(dt.value.split("-")[1], dt.value.split("-")[0])
    getOptionKH(dt.value.split("-")[1], dt.value.split("-")[0])

});

document.getElementById("selectkh").addEventListener("change", function () {
    var selected = document.getElementById("selectkh").value;
    getPie(dt.value.split("-")[1], dt.value.split("-")[0])
})


document.getElementById("selectchuyen").addEventListener("change", function () {
    var selected = document.getElementById("selectchuyen").value;

    GetChiTietTienDoMaHang(selected, localStorage.getItem("StyleIDTienDo"), dt.value.split("-")[1], dt.value.split("-")[0])
    document.getElementById("tdnum").innerHTML = localStorage.getItem("StyleIDTienDo")
    listPieDetail.map(x => {
        if (x.ID == selected) {
            document.getElementById("tdcnum").innerHTML = x.Name;

        }
    })
    GetChiTietChuyenNgayGiao(selected, dt.value.split("-")[1], dt.value.split("-")[0])
})

function onlyUnique(value, index, array) {
    return self.indexOf(value.MaKhachHang) === index;
}
getOptionKH(dt.value.split("-")[1], dt.value.split("-")[0])
function getOptionKH(month, year) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetMaHangTheoThang?month=" + month + "&&year=" + year,
        dataType: "json",
        success: function (response) {
            listMaHAngTheoThang = response;
            var listKHTemp = [];
            response.forEach(x => {
                listKHTemp.push({
                    "KhachHang": x.KhachHang,
                    "MaKhachHang": x.MaKhachHang
                })
            })
            const key = 'MaKhachHang';
            listKH = [...new Map(listKHTemp.map(item =>
                [item[key], item])).values()];

            rennderOptionKH(listKH);
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}
function getPie(month, year) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetMaHangTheoThang?month=" + month + "&&year=" + year,
        dataType: "json",
        success: function (response) {
            listMaHAngTheoThang = response;
            
            if (selectbox.value == '') {
              
                results1 = []
                var num = 0;
                response.map(x => {
                    results.push("Mã hàng " + x.MaHang, x.SLKH)
                    results1.push(results)
                    results = []
                    num++;
                })
                if (num > 0) {
                    renderPie(results1);
                    if (num > 0) {
                        getPieDetail(response[0].StyleID, month, year);
                        //GetChiTietTienDoMaHang(localStorage.getItem("ChuyenIDTienDo"), response[0].StyleID, month, year)
                        localStorage.setItem("StyleIDTienDo", response[0].StyleID)
                    }
                } else {
                    alert("không đủ số liệu để phân tích,vui lòng chọn mốc thời gian khác");
                }
            } else {
                results1 = []
                var styleIDFLoad = '';
                var num = 0;
                response.map(x => {
                    if (x.MaKhachHang == selectbox.value) {
                        if (styleIDFLoad == '') {
                            styleIDFLoad = x.StyleID;
                        }
                        results.push("Mã hàng " + x.MaHang, x.SLKH)
                        results1.push(results)
                        results = []
                        num++;
                    }
                })
                if (num > 0) {
                    renderPie(results1);
                    if (num > 0) {
              
                        getPieDetail(styleIDFLoad, month, year);
                        //GetChiTietTienDoMaHang(localStorage.getItem("ChuyenIDTienDo"), styleIDFLoad, month, year)
                        localStorage.setItem("StyleIDTienDo", results1[0].StyleID)
                    }
                } else {
                    alert("không đủ số liệu để phân tích,vui lòng chọn mốc thời gian khác");
                }
            }

        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}


var listPieDetail = [];
function getPieDetail(id, dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetAllMaHangTrongThangTheoChuyen?styleID=" + id + "&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            localStorage.setItem("StyleIDTienDo", id)
            listPieDetail = response;
            var resultstc = []
            var results1tc = []

            var num = 0;
            response.map(x => {
                resultstc.push("Chuyền : " + x.Name, x.SLKH)
                results1tc.push(resultstc)
                resultstc = []
                num++;
            })
            rennderOptionChuyen(response)
            GetChiTietTienDoMaHang(response[0].ID, response[0].StyleID, dt, de)
            document.getElementById("tdnum").innerHTML = response[0].StyleID
            document.getElementById("tdcnum").innerHTML = response[0].Name

            renderPieDetail(results1tc)
            //GetChiTietChuyenNgayGiao(id, dt, de)
            //GetAllChiTietChuyenNgayGiao(dt, de)
            //GetMoTaPhanTichMaHang(dt, de)

        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

function GetChiTietTienDoMaHang(line,id, dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/TienDo/GetChiTietTienDoMaHang?action=GetChiTietTienDoMaHang&&line=" + line +"&&styleID=" + id + "&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
         
            var charttd = [];
            var charttditem = [];
            charttd.push((response[0].SLCut_LK / response[0].SLKH * 100).toFixed(2), (response[0].LuyKe_BTP / response[0].SLKH * 100).toFixed(2), (response[0].RC_LK / response[0].SLKH * 100).toFixed(2), (response[0].GX_LK / response[0].SLKH * 100).toFixed(2));
            charttditem.push("Cắt", "BTP", "RC", "Đóng thùng");
            renderChart(charttd, charttditem);
            document.getElementById("CAT").innerHTML = (response[0].SLCut_LK / response[0].SLKH * 100).toFixed(2) + '%';
            if (parseInt(response[0].SLCut_LK / response[0].SLKH * 100) > 100) {
                document.getElementById("CAT").style.width = '100%';
            } else {
                document.getElementById("CAT").style.width = (response[0].SLCut_LK / response[0].SLKH * 100).toFixed(2) + '%';
            }

            document.getElementById("BTP").innerHTML = (response[0].LuyKe_BTP / response[0].SLKH * 100).toFixed(2) + '%';
            if (parseInt(response[0].LuyKe_BTP / response[0].SLKH * 100) > 100) {
                document.getElementById("BTP").style.width = '100%';
            } else {
                document.getElementById("BTP").style.width = (response[0].LuyKe_BTP / response[0].SLKH * 100).toFixed(2) + '%';
            }

            document.getElementById("RC").innerHTML = (response[0].RC_LK / response[0].SLKH * 100).toFixed(2) + '%';
            if (parseInt(response[0].RC_LK / response[0].SLKH * 100) > 100) {
                document.getElementById("RC").style.width = '100%';
            } else {
                document.getElementById("RC").style.width = (response[0].RC_LK / response[0].SLKH * 100).toFixed(2) + '%';
            }

            document.getElementById("DT").innerHTML = (response[0].GX_LK / response[0].SLKH * 100).toFixed(2) + '%';
            if (parseInt(response[0].GX_LK / response[0].SLKH * 100) > 100) {
                document.getElementById("DT").style.width = '100%';
            } else {
                document.getElementById("DT").style.width = (response[0].GX_LK / response[0].SLKH * 100).toFixed(2) + '%';
            }
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
        url: "/api/TienDo/GetChiTietTienDoMaHang?action=getchitietchuyenngaygiao&&line=" + id + "&&styleID=a" + "&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            console.log(response,"a")
            var series = []
            var xasix = []
         
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
       
            renderChart(data)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}

getPie(dt.value.split("-")[1], dt.value.split("-")[0])

function renderChart(data1, category) {
    //document.getElementById("apex-chart-tiendo").innerHTML = '';

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
            text: 'Sơ đồ mã hàng - SLKH'
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            iD = this.name.split(" ")[2];
                            let html = "<div></div>"
                            listMaHAngTheoThang.forEach(x => {
                                if (x.MaHang == iD) {
                                    //document.querySelector("#containertiendotheochuyen").innerHTML = html
                                    getPieDetail(x.StyleID, dt.value.split("-")[1], dt.value.split("-")[0])
                                    localStorage.setItem("StyleIDTienDo", x.StyleID)
                                }
                            })


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
function renderPieDetail(data) {
  
    Highcharts.chart('containertiendotheochuyen', {

        title: {
            text: 'Sơ đồ mã hàng ' + localStorage.getItem("StyleIDTienDo")+' theo chuyền'
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            iD = this.name.split(" ")[2];
                          
                            let html = "<div></div>"
                            listPieDetail.forEach(x => {
                                if (x.Name == iD) {
                                    localStorage.setItem("ChuyenIDTienDo", x.ID)
                                    GetChiTietTienDoMaHang(x.ID, localStorage.getItem("StyleIDTienDo"), dt.value.split("-")[1], dt.value.split("-")[0])
                                    document.getElementById("tdnum").innerHTML = localStorage.getItem("StyleIDTienDo")
                                    document.getElementById("tdcnum").innerHTML = x.Name


                                }
                            })
                          
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
function rennderOptionKH(option) {
  
    let getImgs = `<option value="" >--Tất cả--</option>`;
    for (let i = 0; i < option.length; i++) {
        //var TenLenhTemp = option[i].TenLenh.toString().length > 13 ? option[i].TenLenh.toString().substr(0, 10) + "..." : option[i].TenLenh.toString()
        getImgs =
            getImgs +
            `<option value="${option[i].MaKhachHang}" >${option[i].KhachHang}</option>
                 `;

    }
    selectbox.innerHTML = getImgs;
}

function rennderOptionChuyen(option) {
   
    let getImgs = ``;

    //let getImgs = `<option value="" >--Tất cả--</option>`;
    for (let i = 0; i < option.length; i++) {
        //var TenLenhTemp = option[i].TenLenh.toString().length > 13 ? option[i].TenLenh.toString().substr(0, 10) + "..." : option[i].TenLenh.toString()
        getImgs =
            getImgs +
            `<option value="${option[i].ID}" >Chuyền ${option[i].Name}</option>
                 `;
    }
    selectboxchuyen.innerHTML = getImgs;
}




