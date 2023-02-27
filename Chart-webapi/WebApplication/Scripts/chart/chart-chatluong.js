let categorycl = []; let datacl = []
var resultscl = [];
var results1cl = [];

let categoryclchuyen = []; let dataclchuyen = []
var resultsclchuyen = [];
var results1clchuyen = [];

let iDcl = 1;
var dtchatluong = new Date();
var dataPieCL = [];

var dataPieDetailCL = [];
//alert(dtchatluong)

var dtcl = document.getElementById("dtcl");
var decl = document.getElementById("decl");

var dt = document.getElementById("dt");
var de = document.getElementById("de");
var dtiendo = new Date();

decl.value = formatDate3(dtchatluong);
dtcl.value = formatDate3(dtchatluong.setFullYear(dtchatluong.getFullYear() - 1));



//de.value = formatDate3(dtiendo);
//dt.value = formatDate3(dtiendo.setFullYear(dtiendo.getFullYear() - 1));
dtcl.addEventListener('change', function () {
    getPieCL(formatDate(dt.value), formatDate(de.value))
});

decl.addEventListener('change', function () {
    getPieCL(formatDate(dt.value), formatDate(de.value))

});

getPieCL(dtcl.value, decl.value)
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
function getPieCL(dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetAllChuyenLoi?dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            dataPieCL = response;
            results1cl = []
            var num = 0;
            response.map(x => {
                resultscl.push("Chuyền " + x.Name, x.TongLoi)
                results1cl.push(resultscl)
                resultscl = []
                num++;
            })
            if (num > 0) {
                renderPieCL(results1cl);
                var tongloimax = arrayMaxTongLoi(response)
                document.getElementById("chuyencancaithien").innerHTML = tongloimax[0].Name + " - Tổng lỗi : " + tongloimax[0].TongLoi

                if (num > 0) {
                    getPieDetailCL(response[0].Name, formatDate(dtcl.value), formatDate(decl.value))


                    localStorage.setItem("ChuyenChatLuong", response[0].Name)
                }

                document.getElementById("ptchuyen").innerHTML = localStorage.getItem("ChuyenChatLuong");
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
function arrayMaxChatLuong(arr) {

 
    var len = arr.length, max = -Infinity;
    var obj = [];
    while (len--) {
        if (arr[len].TiLeLoi > max) {
            max = arr[len].TiLeLoi;
            obj = [];
            obj.push(arr[len])
        }
    }
 
    return obj;
};
function arrayMaxTongLoi(arr) {
    var len = arr.length, max = -Infinity;
    var obj = [];
    while (len--) {
        if (arr[len].TongLoi > max) {
            max = arr[len].TongLoi;
            obj = [];
            obj.push(arr[len])
        }
    }
    return obj;
};
function arrayMinTongLoi(arr) {
    var len = arr.length, max = Infinity;
    var obj = [];
    while (len--) {
        if (arr[len].TongLoi < max) {
            max = arr[len].TongLoi;
            obj = [];
            obj.push(arr[len])
        }
    }
    return obj;
};
function getPieDetailCL(id, dt, de) {
    var idc = '';
    dataPieCL.forEach(x => {
        if (x.Name == id) {
            idc = x.LineX;
        }
    })
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetThongKeTLLoi?line=" + idc + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            results1clchuyen = []
            dataPieDetailCL = response;
            var num = 0;
            response.map(x => {
                resultsclchuyen.push(x.MaHang, x.TongLoi)
                results1clchuyen.push(resultsclchuyen)
                resultsclchuyen = []
                num++;
            })
            var mathangtm = arrayMinTongLoi(response);
            var sanphamcancaithien = arrayMaxTongLoi(response);
            document.getElementById("hhtm").innerHTML = mathangtm[0].MaHang + "-" + "Tổng lỗi: " + mathangtm[0].TongLoi
            document.getElementById("sanphamcancaithien").innerHTML = sanphamcancaithien[0].MaHang + " - tổng lỗi:" + sanphamcancaithien[0].TongLoi;
            renderPieCLTheoChuyen(results1clchuyen);
            if (num > 0) {
                getPieDetailCLTheoMaHang(response[0].MaHang, response[0].TongLoi, formatDate(dtcl.value), formatDate(decl.value))
                document.getElementById("mhct").innerHTML = response[0].MaHang;
                localStorage.setItem("ChuyenChatLuong", response[0].Name)
            }
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}

function getPieDetailCLTheoMaHang(id,loi, dt, de) {
    var idchuyen = "";
    dataPieDetailCL.forEach(x => {
        if (x.MaHang == id && x.TongLoi == loi) {
            idchuyen = x.LineX;
        }
    })
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetThongKeTLLoiTheoMaHang?line=" + idchuyen + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            var resultchuyentheomahang = []
            var num = 0;
            response.map(x => {

                if (id == x.MaHang) {
                    resultchuyentheomahang.push(x)
                }
            })
            var mattl = arrayMaxChatLuong(response)
      
            var mattlchuyen = arrayMaxChatLuong(resultchuyentheomahang)

            var summahang = 0;
            var sumchuyen = 0;

            resultchuyentheomahang.forEach((num) => { summahang += num.TiLeLoi });
            response.forEach((num) => { sumchuyen += num.TiLeLoi });

            var averagemahang = (summahang / resultchuyentheomahang.length).toFixed(2);
            var averagechuyen = (sumchuyen / response.length).toFixed(2);


            document.getElementById("tlltbchuyen").innerHTML = averagechuyen;
            document.getElementById("tlltb").innerHTML = averagemahang;

            document.getElementById("tllcn").innerHTML = "Mã hàng :" + mattl[0].MaHang + " - Tỉ lệ lỗi:" + mattl[0].TiLeLoi + " - Ngày: " + mattl[0].Ngay;
            document.getElementById("tllcnchuyen").innerHTML = "Ngày :" + mattlchuyen[0].Ngay + " - Tỉ lệ lỗi:" + mattlchuyen[0].TiLeLoi
            var series = []
            var seriesLoi = []

            var xasix = []
            resultchuyentheomahang.forEach(k => {
                series.push(
                    k.SPDAT
                )
                seriesLoi.push(k.SPLOI)
                xasix.push(k.Ngay)
            })
            document.getElementById("linechartchatluong").innerHTML = '';
            setTimeout(function () { renderLineChartChatLuong(resultchuyentheomahang, series, seriesLoi, xasix); },200)
      

        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
function onlyUnique(value, index, array) {
    return self.indexOf(value) === index;
}
function getPieDetailCLTheoMaHangall(dt, de) {
    var idchuyen = ' ';

    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetThongKeTLLoiTheoMaHang?line=" + idchuyen + "&&dt=" + dt + "&&de=" + de,
        dataType: "json",
        success: function (response) {
            var len = response.length, max = -Infinity;
            var obj = [];
            while (len--) {
                if (response[len].TongLoi > max) {
                    max = response[len].TiLeLoi;
                    obj = [];
                    obj.push(response[len])
                }
            }
            var dsMaHangLoi = [];
            response.forEach(x => {
                if (x.TiLeLoi == obj[0].TiLeLoi) {
                    dsMaHangLoi.push(x.MaHang)
                }
            })
            const unique = Array.from(new Set(dsMaHangLoi));
            var dsmahangcaithien = unique[0];
            if (unique.length > 5) {
                for (var i = 1; i < 5; i++) {
                    dsmahangcaithien += "," + unique[i];
                }
                document.getElementById("mathangcancaithien").innerHTML = unique.length + " mặt hàng như :" + dsmahangcaithien + "...(Tỉ lệ lỗi hiện tại : " + obj[0].TiLeLoi + ")";
            } else {
                for (var i = 1; i < 5; i++) {
                    dsmahangcaithien += "," + unique[i];
                }
                document.getElementById("mathangcancaithien").innerHTML = "các mặt hàng như :" + dsmahangcaithien + "(Tỉ lệ lỗi hiện tại : " + obj[0].TiLeLoi + ")";

            }
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
getPieDetailCLTheoMaHangall(formatDate(dtcl.value), formatDate(decl.value))
function renderPieCL(data) {
    Highcharts.chart('containerchatluong', {

        title: {
            text: 'Biểu đồ lỗi theo chuyền'
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            iD = this.name.split(" ")[1];
                          
                            let html = "<div></div>"
                            //document.querySelector("#apex-chart-chatluong").innerHTML = html
                            getPieDetailCL(iD, formatDate(dtcl.value), formatDate(decl.value))
                        
                            localStorage.setItem("ChuyenChatLuong", iD)
                            document.getElementById("mhctchuyen").innerHTML = iD;

                            document.getElementById("ptchuyen").innerHTML = localStorage.getItem("ChuyenChatLuong");

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

function renderPieCLTheoChuyen(data) {
    document.getElementById("mhctchuyen").innerHTML = localStorage.getItem("ChuyenChatLuong");

    Highcharts.chart('containerchatluongtheochuyen', {

        title: {
            text: 'Biểu đồ lỗi theo mã hàng - chuyền ' + localStorage.getItem("ChuyenChatLuong")
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            iD = this.name;
                       
                            let html = "<div></div>"
                            //document.querySelector("#apex-chart-chatluong").innerHTML = html
                            getPieDetailCLTheoMaHang(iD, this.y, formatDate(dt.value), formatDate(de.value))
                            document.getElementById("mhct").innerHTML = iD;

                            //localStorage.setItem("ChuyenChatLuong", iD)

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
function renderLineChartChatLuong(data, series, seriesLoi, xaxis) {
    //console.log(series, seriesLoi, xaxis, data[0].MaHang, "srl")
    var optionschatluong = {
        series: [{
            name: "Sản phẩm đạt",
            data: series
        }, {
                name: "Sản phẩm lỗi",
                data: seriesLoi
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
            text: 'Tỉ lệ lỗi theo mã hàng - '+data[0].MaHang,
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
    //alert(".")
    var chart = new ApexCharts(document.querySelector("#linechartchatluong"), optionschatluong);
    chart.render();

}


