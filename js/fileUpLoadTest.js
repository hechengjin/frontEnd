// Hello.
//
// This is The Scripts used for ___________ Theme
//
//

function checkImgFile(fileObj) {
    checkFileSizeIllegal(fileObj, 5);
}


function checkFileSizeIllegal(fileObj, fileSize) {
    var browserVersion = window.navigator.userAgent.toUpperCase();
    if (fileObj.files){
        if (fileObj.files[0].size > fileSize * 1024 * 1024){
            var sizeInfo = "文件大小不能超过 " + fileSize +" M";
            alert(sizeInfo);
            fileObj.value = "";//清空选中文件
            if (browserVersion.indexOf("MSIE") > -1) {
                fileObj.select();
                document.selection.clear();
            }
            fileObj.outerHTML = fileObj.outerHTML;
            return true;
        }
    }
    return false;
}

function upImg(filesel) {
    var newFormData = new FormData();
    newFormData.append("img",filesel);
    $.ajax({
        url: "http://192.168.134.99:8055/api/ad/w/ads/upImg",
        //dataType: 'json',
        type: 'post',
        data: newFormData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        error : function(data) {
            console.log(data.status + " : " + data.statusText + " : " + data.responseText);
        },
        success: function (data) {
            console.log(data)
        }
    });
}

function main() {

(function () {
   'use strict';

  	$(document).ready(function() {
		
	  $("#uploadImg").click(function () {
            if(document.getElementById("imgs").value == ""){
                alert("请选择图片!")
                return;
            }
            upImg(document.getElementById("imgs").files[0]);
        });
  	});

}());


}
main();