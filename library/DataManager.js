// manage data of a google spreadsheet file
function DataManager(file_id){
	if (this instanceof DataManager){
		AFile.call(this, file_id);
	}
	else{
		return new DataManager(file_id)
	}
};

DataManager.prototype = Object.create(AFile.prototype, {constructor:{value: DataManager}});
DataManager.prototype.get_data = function(sheet_name, data_start_row, data_start_col, data_col_num){
	var asheet = this.get_asheet_by_name(sheet_name);
	data_start_row = data_start_row ? data_start_row : 2;
	data_start_col = data_start_col ? data_start_col : 1;
	var data = asheet.get_data({
		row: data_start_row, 
		col: data_start_col, 
		row_num: asheet.sheet.getLastRow() - data_start_row + 1, 
		col_num: data_col_num ? data_col_num : asheet.sheet.getLastColumn()
	});

	return data
};


// add curr datetime to data
DataManager.prototype.add_curr_datetime = function (data, datetime_index){
	var index = datetime_index ? datetime_index : data[0].length;
	var dt = libs.get_datetime_now_str();
	var ori_copy = libs.add_mid_2d_array(data, [dt], index);
	return ori_copy
};

// check if values is empty. assume empty first.
// values is in the form of [[],[], ...]
DataManager.prototype.check_empty = function (values){
    num = values.length;
    empty = 1;
    for (var i = 0; i < num; i++){
    	subnum = values[i].length
    	for (var j = 0; j < subnum; j++){
    		if (values[i][j] || values[i][j] == 0){
    			empty = 0;
    			break;
    		}
    	}
    }

    if (!empty){
    	return false
    }

    return true			
};

// get client data
DataManager.prototype.get_data = function(sheet_name, data_start_row, data_start_col, data_col_num){
	var asheet = this.get_asheet_by_name(sheet_name);
	data_start_row = data_start_row ? data_start_row : 2;
	data_start_col = data_start_col ? data_start_col : 1;
	var data = asheet.get_data({
		row: data_start_row, 
		col: data_start_col, 
		row_num: asheet.sheet.getLastRow() - data_start_row + 1, 
		col_num: data_col_num ? data_col_num : asheet.sheet.getLastColumn()
	});

	return data
};
    
DataManager.prototype.clear_data = function (sheet_name, data, start_row, start_col, not_del_col_num){
	var asheet = this.get_asheet_by_name(sheet_name);
	start_row = start_row ? start_row : 2;
	start_col = start_col ? start_col : 1;	
	var rg_values = this.get_rg_values_from_data(asheet, data, {row:start_row, col:start_col});
	not_del_col_num = not_del_col_num ? not_del_col_num : 0;
	rg_values.col_num = rg_values.col_num - not_del_col_num;
	asheet.clear_data(rg_values);		
};

// using data to determine row num and col num
DataManager.prototype.get_rg_values_from_data = function (asheet, data, row_col){
	var start_col = row_col.col ? row_col.col : 1;
	var start_row = row_col.row ? row_col.row : 2;
	var row_num = data.length;
	var col_num = data[0].length;
	return {row: start_row, col: start_col, row_num: row_num, col_num: col_num}
}

// insert data according to its id. Better use for small dataset 
// id_index is the index in data that contain id
DataManager.prototype.insert_data_by_id = function(sheet_name, data, data_start_row, data_start_col, id_index, insert_id){
	var asheet = this.get_asheet_by_name(sheet_name);

	var index_added = data_start_row - 1;
	var num = data.length;
	var temp_data = [];

	for (var i = 0; i < num; i++){
		var item = data[i];
		var id = item[id_index];
		var row = index_added + id;
		var col = data_start_col;
		if (!insert_id) item.splice(id_index,1);
      
		temp_data.push(item);
		var rg_values = this.get_rg_values_from_data(asheet, temp_data, {row: row, col:col});
		asheet.insert_data(temp_data, rg_values);
        temp_data = []; // reset data
	}
	return data
};

// insert all data at once
DataManager.prototype.insert_data = function(sheet_name, data, start_col_index, start_row_index){
    var asheet = this.get_asheet_by_name(sheet_name);
    start_col_index = start_col_index ? start_col_index : 1; 
    start_row_index = start_row_index ? start_row_index: asheet.sheet.getLastRow() + 1;
	var rg_values = this.get_rg_values_from_data(asheet, data, {row: start_row_index, col:start_col_index});
    
    asheet.insert_data(data, rg_values);

    return data
};

DataManager.prototype.get_uploaded_last_row = function (sheet_name, rg_values) {
	var asheet = this.get_asheet_by_name(sheet_name);
	return asheet.get_data(rg_values)[0][0]
};

// keep track index of last row upload 
DataManager.prototype.set_uploaded_last_row = function (sheet_name, values, rg_values){
	var asheet = this.get_asheet_by_name(sheet_name);
	asheet.insert_data(values, rg_values);
};

DataManager.prototype.check_new_row = function (sheet_name, logged_last_row_rg_values, curr_last_row_rg_values){
	var asheet = this.get_asheet_by_name(sheet_name);
	var curr_last_row = asheet.get_data(curr_last_row_rg_values)[0][0];
	var logged_last_row = asheet.get_data(logged_last_row_rg_values)[0][0];
	
	if (curr_last_row > logged_last_row){
		return true
	}
	else{
		return false
	}
};

// DEPRICATED. Not use anymore
// check if there is new data by checking the new row number against the row number logged
DataManager.prototype.check_new_data_row = function (sheet_name, logged_last_row){
	var asheet = this.get_asheet_by_name(sheet_name);
	var curr_last_row = asheet.sheet.getLastRow();
	if (curr_last_row > logged_last_row){
		return true
	}
	else{
		return false
	}
};
