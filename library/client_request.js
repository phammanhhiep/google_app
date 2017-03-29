// service: sales_report, and so on
// report: results, activities, and so on
function client_request (service, action){
	var url = server_config.url;
   	var aFile = new AFile(); // current file

    var params = {
    	service: service,
    	action: action,
        file_id: aFile.file_id,
    };

    params = libs.from_obj_to_urlparam(params);

    url = '{0}?{1}'.format(url, params);
    
	var options =
		{
			"method"  : "GET",   
			"followRedirects" : true,
			"muteHttpExceptions": true
		};

	var res = UrlFetchApp.fetch(url, options);
    res = JSON.parse(res);
    return res;
}
