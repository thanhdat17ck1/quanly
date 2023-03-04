let categorycl = []; let datacl = []
var resultscl = [];
var results1cl = [];

let categoryclchuyen = []; let dataclchuyen = []
var resultsclchuyen = [];
var results1clchuyen = [];

let iDcl = 1;
var dtchatluong = new Date("01-02-2023");
var dataPieCL = [];
var lstAllChuyen = [];
var dataDicGiaTri = [];
var dataThongTinTong = [];

var dataPieDetailCL = [];
//alert(dtchatluong)

var dtcl = document.getElementById("dtcl");
var decl = document.getElementById("decl");
var selectbox = document.getElementById("selectchuyen");
var dt = document.getElementById("dt");
var de = document.getElementById("de");
var dtiendo = new Date();

dtcl.value = formatDateMonthValid(dtchatluong);

dtcl.addEventListener('change', function () {
    getPieCL(dtcl.value.split("-")[1], dtcl.value.split("-")[0])
});

//$(function () {
//    $.datepicker.regional['vi'] = {
//        closeText: 'Đóng',
//        prevText: '&#x3c;Trước',
//        nextText: 'Tiếp&#x3e;',
//        currentText: 'Hôm nay',
//        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
//            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
//        monthNamesShort: ['Thg1', 'Thg2', 'Thg3', 'Thg4', 'Thg5', 'Thg6',
//            'Thg7', 'Thg8', 'Thg9', 'Thg10', 'Thg11', 'Thg12'],
//        dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
//        dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
//        dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
//        weekHeader: 'Tuần',
//        dateFormat: 'dd/mm/yy',
//        firstDay: 0,
//        isRTL: false,
//        showMonthAfterYear: false,
//        yearSuffix: ''
//    };
//    $.datepicker.setDefaults($.datepicker.regional['vi']);
//    $("#dtcl").datepicker();
//});

document.getElementById("selectchuyen").addEventListener("change", function () {
    //var selected = document.getElementById("selectkh").value;
    getPieDetailCL("", localStorage.getItem("MaHangChatLuongTongQuan"), dtcl.value.split("-")[1], dtcl.value.split("-")[0])
})
getdicgiaatri(dtcl.value.split("-")[1], dtcl.value.split("-")[0])

getPieCL(dtcl.value.split("-")[1], dtcl.value.split("-")[0])
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

function getPieCL(dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetThongKeTLLoiThangTheoMaHang?action=GetThongKeTLLoiTheoMaHang&&line=&&styleID&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            dataPieCL = response;
     
            results1cl = []
            var num = 0;
            response.map(x => {
                resultscl.push("Mã hàng :" + x.MaHang, x.TongLoi)
                results1cl.push(resultscl)
                resultscl = []
                num++;
            })
            if (num > 0) {
                renderPieCL(results1cl);
                GetAllChuyen("", response[0].StyleID, dtcl.value.split("-")[1], dtcl.value.split("-")[0])
               
                if (num > 0) {
                    localStorage.setItem("MaHangChatLuongTongQuan", response[0].StyleID)
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
function getdicgiaatri(dt, de) {
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetChatLuongChiTiet?action=getdicgiatri&&line=&&styleID=&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            dataDicGiaTri = response;
            getthongtintong(dt, de);
            
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function getthongtintong(dt, de) {

    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetChatLuongChiTiet?action=gettttong&&line=&&styleID=&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            dataThongTinTong = response;
            var DataTopTTL = [];
            dataThongTinTong.forEach(x => {
                if (x.TiLeLoi > dataDicGiaTri[0].Rate_Green)
                    DataTopTTL.push({ "MaHang": x.MaHang, "TiLeLoi": x.TiLeLoi })
            })
            const arrayUniqueByKey = [...new Map(DataTopTTL.map(item =>
                [item["MaHang"], item])).values()];

            arrayUniqueByKey.sort((a, b) => {
                return b.TiLeLoi - a.TiLeLoi;
            });
            var datattl = [];
            var datattllabel = [];

            for (var i = 0; i < 10; i++) {
                datattl.push(arrayUniqueByKey[i].TiLeLoi)
                datattllabel.push(arrayUniqueByKey[i].MaHang)

            }

            renderbarTiLeLoi(datattl.reverse(), datattllabel.reverse())
            //console.log(arrayUniqueByKey,"Top TTL")
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}
function GetAllChuyen(id, mahang, dt, de) {
    var styleID = '';
    console.log(mahang, dt, de,"de")
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetThongKeTLLoiThangTheoMaHang?action=GetAllChuyen&&line=&&styleID=" + mahang + "&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
            lstAllChuyen = [];
            
            response.forEach(x => {
                lstAllChuyen.push({
                    "ID": x.LineX,
                    "Name": x.Name

                })
            })

            lstAllChuyen = [...new Map(lstAllChuyen.map(item =>
                [item["ID"], item])).values()];
            console.log(lstAllChuyen,"lstAllChuyen")
            rennderOptionKH(lstAllChuyen);
            getPieDetailCL("", response[0].StyleID, dtcl.value.split("-")[1], dtcl.value.split("-")[0])
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}

function getPieDetailCL(id, mahang, dt, de) {
    var styleID = '';
    console.log(mahang)
    $.ajax({
        type: "GET",
        url: "/api/ChatLuong/GetThongKeTLLoiThangTheoMaHang?action=GetAllThongTinTheoMaHang&&line=&&styleID=" + mahang + "&&month=" + dt + "&&year=" + de,
        dataType: "json",
        success: function (response) {
                var dtSPdat = []
                var dtSPloi = []
                var dtSPtll = []
                var lstNgay = []

                dataPieDetailCL = response;
                var num = 0;
                response.map(x => {
                    if (x.LineX == selectbox.value) {
                        dtSPdat.push(x.SPDAT)
                        dtSPloi.push(x.SPLOI)
                        dtSPtll.push(x.TiLeLoi)
                        lstNgay.push(x.Ngay)
                        num++;
                    }

                   
                })
                //var mathangtm = arrayMinTongLoi(response);
                //var sanphamcancaithien = arrayMaxTongLoi(response);
                //document.getElementById("hhtm").innerHTML = mathangtm[0].MaHang + "-" + "Tổng lỗi: " + mathangtm[0].TongLoi
                //document.getElementById("sanphamcancaithien").innerHTML = sanphamcancaithien[0].MaHang + " - tổng lỗi:" + sanphamcancaithien[0].TongLoi;
            if (num > 0) {
                    document.getElementById("chartmix2").innerHTML = "";
                    renderPieCLTheoChuyen(dtSPdat, dtSPloi, dtSPtll, lstNgay);
                    localStorage.setItem("MaHangChatLuongTongQuan", mahang)
                }
            
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}

function getPieDetailCLTheoMaHang(id, loi, dt, de) {
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
            setTimeout(function () { renderLineChartChatLuong(resultchuyentheomahang, series, seriesLoi, xasix); }, 200)


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
                            console.log(iD)
                            dataPieCL.forEach(x => {
                                if (x.MaHang == iD) {
                                    let html = "<div></div>"
                                    GetAllChuyen("", x.StyleID, dtcl.value.split("-")[1], dtcl.value.split("-")[0])
                                    document.getElementById("chartmix2").innerHTML = html;
                                    setTimeout(getPieDetailCL("", x.StyleID, dtcl.value.split("-")[1], dtcl.value.split("-")[0]) ,1500)    
                                    localStorage.setItem("MaHangChatLuongTongQuan", x.StyleID)
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

function renderPieCLTheoChuyen(dataspDat, dataSPLoi, dataTLL, lstNgay) {
    var options = {
        series: [{
            name: 'SP đạt',
            type: 'column',
            data: dataspDat
        }, {
            name: 'SP lỗi',
            type: 'column',
            data: dataSPLoi
        }, {
            name: 'Tỷ lệ lỗi',
            type: 'line',
            data: dataTLL
        }],
        chart: {
            height: 350,
            type: 'line',
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4]
        },
        title: {
            text: '',
            align: 'left',
            offsetX: 110
        },
        xaxis: {
            categories: lstNgay,
        },
        yaxis: [
            {
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#008FFB'
                },
                labels: {
                    style: {
                        colors: '#008FFB',
                    }
                },
                title: {
                    text: "Số lượng sản phẩm đạt",
                    style: {
                        color: '#008FFB',
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            {
                seriesName: 'SP đạt',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#00E396'
                },
                labels: {
                    style: {
                        colors: '#00E396',
                    }
                },
                title: {
                    text: "Số lượng sản phẩm lỗi",
                    style: {
                        color: '#00E396',
                    }
                },
            },
            {
                seriesName: 'SP lỗi',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#FEB019'
                },
                labels: {
                    style: {
                        colors: '#FEB019',
                    },
                },
                title: {
                    text: "Tỷ lệ lỗi",
                    style: {
                        color: '#FEB019',
                    }
                }
            },
        ],
        tooltip: {
            fixed: {
                enabled: true,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'left',
            offsetX: 40
        }
    };

    var chart = new ApexCharts(document.querySelector("#chartmix2"), options);
    chart.render();


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
            text: 'Tỉ lệ lỗi theo mã hàng - ' + data[0].MaHang,
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


function rennderOptionKH(option) {

    let getImgs = ``;
    for (let i = 0; i < option.length; i++) {
        //var TenLenhTemp = option[i].TenLenh.toString().length > 13 ? option[i].TenLenh.toString().substr(0, 10) + "..." : option[i].TenLenh.toString()
        getImgs =
            getImgs +
            `<option value="${option[i].ID}" >Chuyền ${option[i].Name}</option>
                 `;

    }
    selectbox.innerHTML = getImgs;
}
function renderbarTiLeLoi(data,label) {
    var options = {
        series: [{
            data:data
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: label,
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart-ttl"), options);
    chart.render();
}