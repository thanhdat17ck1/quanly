let categorycl = []; let datacl = []
var resultscl = [];
var results1cl = [];

let categoryclchuyen = []; let dataclchuyen = []
var resultsclchuyen = [];
var results1clchuyen = [];

let iDcl = 1;
var dtchatluong = new Date("01-02-2023");
var dataPieCL = [];
var dataGhiChuLoi = [];
var dataPieDetailCL = [];
var dataThongTinTong = [];

var dtcl = document.getElementById("dtcl");
var dtiendo = new Date();

dtcl.value = formatDateMonthValid(dtchatluong);


dtcl.addEventListener('change', function () {
    getPieCL(dtcl.value.split("-")[1], dtcl.value.split("-")[0])
    document.getElementById("thang").innerHTML = " " + dtcl.value.split("-")[1]
});
document.getElementById("optionchuyen").addEventListener("change", function () {
    var select = document.getElementById("optionchuyen").value;
    setTimeout(function () {
        getLineChartData(select, localStorage.getItem("MaHangChiTietChatLuong"), dtcl.value.split("-")[1], dtcl.value.split("-")[0])
    }, 500
    )
})


getPieCL(dtcl.value.split("-")[1], dtcl.value.split("-")[0])
getghichuloi(dtcl.value.split("-")[1], dtcl.value.split("-")[0]);
getthongtintong(dtcl.value.split("-")[1], dtcl.value.split("-")[0]);
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
    document.getElementById("thang").innerHTML = " " + month
    var year = new Date(date).getFullYear();
    return year + "-" + month;

}
function getPieCL(dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetChatLuongChiTiet?action=GetAllThongKeTLLoiChiTiet&&line=&&styleID&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            dataPieCL = response;
            console.log(response, "CL")
            var newArr = response.sort((a, b) => a.TongLoi - b.TongLoi); // b - a for reverse sort

            renndertopsploi(newArr)
            results1cl = []
            var num = 0;
            response.map(x => {
                resultscl.push("Mã Hàng :" + x.MaHang, x.TongLoi)
                results1cl.push(resultscl)
                resultscl = []
                num++;
            })

            if (num > 0) {
                renderPieCL(results1cl);
                var maxTongKiem = arrayMaxTongKiem(response)

                var tongloimax = arrayMaxTongLoi(response)
                document.getElementById("mahangcancaithien").innerHTML = tongloimax[0].MaHang + " - Tổng lỗi : " + tongloimax[0].TongLoi
                document.getElementById("hhtm").innerHTML = maxTongKiem[0].MaHang + " - Tổng sản phẩm : " + maxTongKiem[0].TongKiem


                if (num > 0) {
                    //getPieDetailCL(response[0].Name, formatDate(dtcl.value), formatDate(decl.value))
                    getLineData(response[0].StyleID, dt, de)


                    //localStorage.setItem("ChuyenChatLuong", response[0].Name)
                }

                //document.getElementById("ptchuyen").innerHTML = localStorage.getItem("ChuyenChatLuong");
                //document.getElementById("mhct").innerHTML = response[0].MaHang;
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

function getLineData(styleID, dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetChatLuongChiTiet?action=getLineChart&&line=&&styleID=" + styleID + "&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            //var listChuyen = [];
            //response.forEach(x => {
            //    listChuyen.push(x)
            //})
            var lineData = [];
            var lineLabel = [];
            var num = 0;
            response.map(x => {
                lineData.push(x.TongKiem)
                lineLabel.push("Chuyền :" + x.Name)
                num++;
            })
            rennderOptionChuyen(response)
            renderpecentchart(lineLabel, lineData)
            if (num > 0) {
                setTimeout(function () {
                    getLineChartData(response[0].LineX, response[0].StyleID, dt, de)
                }, 500
                )
            }
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}
function getghichuloi(dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetChatLuongChiTiet?action=getghichuloi&&line=&&styleID=&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            dataGhiChuLoi = response;
            console.log(dataGhiChuLoi, "dataGhiChuLoi")
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}
function getLineChartData(LineX, styleID, dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetChatLuongChiTiet?action=getLineChart&&line=" + LineX + "&&styleID=" + styleID + "&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            var resultchuyentheomahang = []
            var num = 0;
            var summahang = 0;
            var sumchuyen = 0;
            var series = []
            var seriesLoi = []
            var dataghichuloi = []
            var categoriesdataghichuloi = []
            var xasix = []
            response.forEach(k => {
                series.push(
                    k.SPDAT
                )
                seriesLoi.push(k.SPLOI)
                xasix.push(k.Ngay)
            })

            dataGhiChuLoi.forEach(l => {
                var sumghichu = 0;
                response.forEach(k => {
                    console.log(k)
                    sumghichu += parseInt(k[l.ID]);
                })
                dataghichuloi.push(sumghichu)
            })

            dataGhiChuLoi.forEach(x => {
                categoriesdataghichuloi.push(x.GhiChuLoi)
            })
            console.log(dataGhiChuLoi, "dataGhiChuLoi")
            document.getElementById("linechartchatluong").innerHTML = '';
            setTimeout(function () {
                renderLineChartChatLuong(response, series, seriesLoi, xasix);
                renderLoiTapTrung(dataghichuloi, categoriesdataghichuloi)

            }, 200)
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
function arrayMaxChiTietLoi(arr) {


    var len = arr.length, max = -Infinity;
    var obj = [];
    while (len--) {
        if (arr[len].Tong > max) {
            max = arr[len].Tong;
            obj = [];
            obj.push(arr[len])
        }
    }

    return obj;
};
function arrayMaxTongKiem(arr) {


    var len = arr.length, max = -Infinity;
    var obj = [];
    while (len--) {
        if (arr[len].TongKiem > max) {
            max = arr[len].TongKiem;
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
function getthongtintong(dt, de) {

    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetChatLuongChiTiet?action=gettttong&&line=&&styleID=&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            dataThongTinTong = response;
            var datatong = [];
            dataGhiChuLoi.forEach(l => {
                var sumghichu = 0;
                response.forEach(k => {
                    sumghichu += parseInt(k[l.ID]);
                })
                datatong.push({ "Loi": l.GhiChuLoi, "Tong": sumghichu })

            })
            var maxTong = arrayMaxChiTietLoi(datatong)
            document.getElementById("loithuonggap").innerHTML = ": " + maxTong[0].Loi;
            document.getElementById("solangap").innerHTML = ": " + maxTong[0].Tong + " lần";

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
//getPieDetailCLTheoMaHangall(formatDate(dtcl.value), formatDate(decl.value))
function renderPieCL(data) {
    Highcharts.chart('containerchatluong', {

        title: {
            text: ''
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            iD = this.name.split(":")[1];
                            dataPieCL.forEach(x => {
                                if (x.MaHang == iD) {
                                    localStorage.setItem("MaHangChiTietChatLuong", x.StyleID)
                                    getLineData(x.StyleID, dtcl.value.split("-")[1], dtcl.value.split("-")[0])
                                    //document.getElementById("mhct").innerHTML = x.MaHang;

                                }
                            })
                            let html = "<div></div>"
                            document.getElementById("chart-percent").innerHTML = html



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

    Highcharts.chart('containerchatluongtheochuyen', {

        title: {
            text: 'Biểu đồ lỗi theo mã hàng - chuyền '
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            iD = this.name;

                            let html = "<div></div>"
                            getPieDetailCLTheoMaHang(iD, this.y, formatDate(dt.value), formatDate(de.value))
                            document.getElementById("mhct").innerHTML = iD;
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
            text: '',
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
function renderLoiTapTrung(data, categories) {
    document.getElementById("chart-phantichloi").innerHTML = '';
    var options = {
        series: [{
            name: '',
            data: data
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: ''
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            title: {
                text: 'Số lần gặp lỗi'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " lần"
                }
            }
        }
    };


    var chart = new ApexCharts(document.querySelector("#chart-phantichloi"), options);
    chart.render();


}

function renderpecentchart(label, data) {
    var options = {
        series: data,
        chart: {
            width: 380,
            type: 'pie',
        },
        title: {
            text: ' '
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function (event) {
                            iD = this.name.split(":")[1];
                            console.log(iD, "chuyền")
                            //dataPieCL.forEach(x => {
                            //    if (x.MaHang == iD) {
                            //        getLineData(x.StyleID, dtcl.value.split("-")[1], dtcl.value.split("-")[0])
                            //    }
                            //})
                            //let html = "<div></div>"
                            //document.getElementById("chart-percent").innerHTML = html



                        }
                    }
                }
            }
        },
        labels: label,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var chart = new ApexCharts(document.querySelector("#chart-percent"), options);
    chart.render();

}

function renndertopsploi(option) {

    let getImgs = ``;
    for (let i = 0; i < 3; i++) {
        getImgs =
            getImgs +
            `<div class="kt-widget5__item">
                                <div class="kt-widget5__content">
                                    <div class="kt-widget5__pic">
                                        <img class="kt-widget7__img" src="/assets/media/products/product27.jpg" alt="">
                                    </div>
                                    <div class="kt-widget5__section">
                                        <a href="#" class="kt-widget5__title">
                                            <span id="mahangtop">Mã hàng ${option[i].MaHang}</span>
                                        </a>
                                        <p class="kt-widget5__desc">
                                            tổng lỗi : <span id="tongloi">${option[i].TongLoi}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="kt-widget5__content">
                                    <div class="kt-widget5__stats">
                                        <span class="kt-widget5__number">${option[i].SPLOI}</span>
                                        <span class="kt-widget5__sales">SP lỗi</span>
                                    </div>
                                    <div class="kt-widget5__stats">
                                        <span class="kt-widget5__number">${option[i].SPDAT}</span>
                                        <span class="kt-widget5__votes">Sản phẩm</span>
                                    </div>
                                </div>
                            </div>
                 `;
    }
    document.getElementById("rendertopsploi").innerHTML = getImgs;
}

function rennderOptionChuyen(option) {

    let getImgs = ``;

    //let getImgs = `<option value="" >--Tất cả--</option>`;
    for (let i = 0; i < option.length; i++) {
        //var TenLenhTemp = option[i].TenLenh.toString().length > 13 ? option[i].TenLenh.toString().substr(0, 10) + "..." : option[i].TenLenh.toString()
        getImgs =
            getImgs +
            `<option value="${option[i].LineX}" >Chuyền ${option[i].Name}</option>
                 `;
    }
    document.getElementById("optionchuyen").innerHTML = getImgs;
}