function DoanhThuTungThang() {
    let value = []
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDThangTrongNam",
        dataType: "json",
        success: function (response) {
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
DoanhThuTungThang();