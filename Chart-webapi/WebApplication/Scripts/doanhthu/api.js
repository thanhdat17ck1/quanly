$(document).ready(function () {
    //$('#kt_table_1').DataTable().fnDestroy();
    //$('#kt_table_1').dataTable({
    //    destroy: true,
    //    //searching: false
    //});
    if (!$('#kt_table_1').hasClass('dataTable') && !$('#kt_table_1').hasClass('DataTable')) {
        $('#kt_table_1').DataTable({
            destroy: true,
        });
    }
})

function GETDTTungChuyen() {
    $.ajax({
        type: "GET",
        url: "/api/DoanhThu/GETDTTungMaHangTable",
        dataType: "json",
        success: function (response) {
            let html = '';
            response.map(x => {
                html += `
<tr>
<td>${x.Linex}</td>
<td>${x.mahang}</td>
<td>${x.SanPham}</td>
<td>${x.USD}</td>
<td>${x.doanhthu}</td>
</tr>
`
            })
            $("#kt_table_1 tbody").html(html)
            //c1onsole.log(response)
            console.log("1")
            loadScript('../assets/vendors/custom/datatables/datatables.bundle.js');
            console.log("2")
            loadScript('../assets/js/demo1/pages/crud/datatables/basic/headers.js');
            console.log("3")
        },
        error: function (xhr, status, error) {
            // Code to handle any errors that may occur while connecting to the API
            console.error(status + ": " + error);
        }
    });
}

async function loadScript(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const script = document.createElement('script');
            script.textContent = this.responseText;
            document.body.appendChild(script);
        }
    };
    xhr.send();
}



GETDTTungChuyen();