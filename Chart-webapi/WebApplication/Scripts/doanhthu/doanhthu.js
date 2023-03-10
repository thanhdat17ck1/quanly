
function GetTopDTKHAllTime() {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GetTopDTKHAllTime",
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            //alert("aa")
            let html = ''
            console.log(response)
            if (response.length == 0) {
                html = "<h3>Không có dữ liệu</h3>"
            }
            else {
                response.map(x => {
                    html += `
                        <div class="kt-widget5__item">
                            <div class="kt-widget5__content">
                                <div class="kt-widget5__pic">
                                    <img class="kt-widget7__img" src="/assets/media/products/product27.jpg" alt="">
                                </div>
                                <div class="kt-widget5__section">
                                    <a href="#" class="kt-widget5__title">
                                        ${x.KhachHang}
                                    </a>
                              </div>
                            </div>
                            <div class="kt-widget5__content">
                                <div class="kt-widget5__stats">
                                    <span class="kt-widget5__number">${x.DoanhThu}</span>
                                    <span class="kt-widget5__sales">USD</span>
                                </div>
                                
                            </div>
                        </div>`

                })
            }
            $("#kt_widget5_tab4_content .kt-widget5").html(html)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}
function GetTopDTKHYearAgo() {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GetTopDTKHYearAgo",
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            //alert("aa")
            let html = ''
            console.log(response)
            if (response.length == 0) {
                html = "<h3>Không có dữ liệu</h3>"
            }
            else {
                response.map(x => {
                    html += `
                        <div class="kt-widget5__item">
                            <div class="kt-widget5__content">
                                <div class="kt-widget5__pic">
                                    <img class="kt-widget7__img" src="/assets/media/products/product27.jpg" alt="">
                                </div>
                                <div class="kt-widget5__section">
                                    <a href="#" class="kt-widget5__title">
                                        ${x.KhachHang}
                                    </a>
                              </div>
                            </div>
                            <div class="kt-widget5__content">
                                <div class="kt-widget5__stats">
                                    <span class="kt-widget5__number">${x.DoanhThu}</span>
                                    <span class="kt-widget5__sales">USD</span>
                                </div>
                                
                            </div>
                        </div>`

                })
            }
            $("#kt_widget5_tab3_content .kt-widget5").html(html)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}
function GetTopDTKHMonthAgo() {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GetTopDTKHMonthAgo",
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            let html = ''
            console.log(response)
            if (response.length == 0) {
                html = "<h3>Không có dữ liệu</h3>"
            }
            else {
                response.map(x => {
                    html += `
                        <div class="kt-widget5__item">
                            <div class="kt-widget5__content">
                                <div class="kt-widget5__pic">
                                    <img class="kt-widget7__img" src="/assets/media/products/product27.jpg" alt="">
                                </div>
                                <div class="kt-widget5__section">
                                    <a href="#" class="kt-widget5__title">
                                        ${x.KhachHang}
                                    </a>
                              </div>
                            </div>
                            <div class="kt-widget5__content">
                                <div class="kt-widget5__stats">
                                    <span class="kt-widget5__number">${x.DoanhThu}</span>
                                    <span class="kt-widget5__sales">USD</span>
                                </div>
                                
                            </div>
                        </div>`

                })
            }
            $("#kt_widget5_tab2_content .kt-widget5").html(html)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}
function GetTopDTKHWeekAgo() {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GetTopDTKHWeekAgo",
        dataType: "json",
        success: function (response) {
            // Code to handle the successful response from the API
            //alert("aa")
            let html = ''
            console.log(response)
            if (response.length == 0) {
                html = "<h3>Không có dữ liệu</h3>"
            }
            else {
                response.map(x => {

                    html += `
                        <div class="kt-widget5__item">
                            <div class="kt-widget5__content">
                                <div class="kt-widget5__pic">
                                    <img class="kt-widget7__img" src="/assets/media/products/product27.jpg" alt="">
                                </div>
                                <div class="kt-widget5__section">
                                    <a href="#" class="kt-widget5__title">
                                        ${x.KhachHang}
                                    </a>
                              </div>
                            </div>
                            <div class="kt-widget5__content">
                                <div class="kt-widget5__stats">
                                    <span class="kt-widget5__number">${x.DoanhThu}</span>
                                    <span class="kt-widget5__sales">USD</span>
                                </div>
                                
                            </div>
                        </div>`

                })
            }
            
            $("#kt_widget5_tab1_content .kt-widget5").html(html)
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });

}


GetTopDTKHWeekAgo();
GetTopDTKHMonthAgo();
GetTopDTKHYearAgo()
//GetTopDTKHAllTime()

//var picker = $('#kt_daterangepicker_1');

//picker.daterangepicker({
//    startDate: moment(),
//    endDate: moment().add(7, 'days')
//}, function (start, end, label) {
//    console.log("A date range was chosen: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
//});
