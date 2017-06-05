// Hello.
//
// This is The Scripts used for ___________ Theme
//
//

function main() {

(function () {
   'use strict';

  	$(document).ready(function() {
		var adMaterialModelList =[ 
			{   adMaterial:   {id: 1, materialName:'materialName'},
				adAdMaterial: {adId: 10, status:0}
			}, 
			{   adMaterial:   {id: 2, materialName:'materialName2'},
				adAdMaterial: {adId: 100, status:1}
			}
		];
  	  var adInf ={ad:{name:'ttt',
					  adTypeId:1},
				  adMaterialModelList: adMaterialModelList
					  }
	  //console.log(adInf);
	  var adSer = $.param(adInf);
	  console.log("序列化：" + adSer);
	  var adJsonStr = (JSON.stringify(adInf));
	  console.log("Json串："+adJsonStr);
	  
	  $.ajax({
		  type: 'POST',
		  url: 'http://192.168.134.99:8055/api/ad/w/ads/addEx',
		  data: adJsonStr,
		  success: function(data) {
			  console.log('suc:'+data)
			},
		  error: function(data) {
			  console.log('err:'+data.responseText)
			},
		  dataType:'json',
		  contentType: "application/json; charset=utf-8"
		});
	  
	  
  	});

}());


}
main();