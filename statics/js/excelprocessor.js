$(document).ready(function () {
    $("#excelfilechooser").change(function() {
        var fileUpload = $("#excelfilechooser").val();  
        var selectedFile = $('#excelfilechooser').prop('files');
        console.log(selectedFile);
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
 
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        GetTableFromExcel(e.target.result);
                    };
                    reader.readAsBinaryString(selectedFile[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        GetTableFromExcel(data);
                    };
                    reader.readAsArrayBuffer(selectedFile[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }

    });

    function GetTableFromExcel(data) {
        //Read the Excel File data in binary
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
 
        //get the name of First Sheet.
        var Sheet = workbook.SheetNames[0];
 
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
 
        //Create a HTML Table element.
        var myTable  = document.createElement("table");
        myTable.border = "1";
 
        //Add the header row.
        var row = myTable.insertRow(-1);
 
        //Add the header cells.
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = "region";
        row.appendChild(headerCell);
 
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "country";
        row.appendChild(headerCell);
 
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "site";
        row.appendChild(headerCell);
        
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "sitelead";
        row.appendChild(headerCell);
        
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "email";
        row.appendChild(headerCell);
         
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "sitedelegate";
        row.appendChild(headerCell);
 
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "facilitieslead";
        row.appendChild(headerCell); 
 
        headerCell = document.createElement("TH");
        headerCell.innerHTML = "securitylead";
        row.appendChild(headerCell);

        //Add the data rows from Excel file.
        for (var i = 0; i < excelRows.length; i++) {
            //Add the data row.
            var jsonToInsert = {};
            var row = myTable.insertRow(-1);
            //Add the data cells.
            var cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].region;
            jsonToInsert.region = excelRows[i].region;
 
            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].country;
            jsonToInsert.country = excelRows[i].country;

            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].site;
            jsonToInsert.site = excelRows[i].site;

            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].sitelead;
            jsonToInsert.sitelead = excelRows[i].sitelead;

            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].email;
            jsonToInsert.email = excelRows[i].email;

            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].sitedelegate;
            jsonToInsert.sitedelegate = excelRows[i].sitedelegate;

            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].facilitieslead;
            jsonToInsert.facilitieslead = excelRows[i].facilitieslead;

            cell = row.insertCell(-1);
            cell.innerHTML = excelRows[i].securitylead;
            jsonToInsert.securitylead = excelRows[i].securitylead;

            $.ajax({
                type: "POST",
                url: '/api/v1/sitecontacts/',
                data: jsonToInsert,
                dataType: 'multipart/form-data;',
                async: false,
                timeout: 30000,
                fail: function () {
                  return true;
                },
                done: function (msg) {
                  if (parseFloat(msg)) {
                    return msg;
                  } else {
                    return msg;
                  }
                }
              });
        }
        
 
        var ExcelTable = document.getElementById("ExcelTable");
        ExcelTable.innerHTML = "";
        ExcelTable.appendChild(myTable);
    };


});