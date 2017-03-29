// represent a report in a file 
function ASheet(sheet_name, sheet){
	if (this instanceof ASheet){
	    this.sheet_name = sheet_name;
	    this.sheet = sheet;	
	}
	else{
		return new ASheet(sheet_name, sheet)
	}	
};

ASheet.prototype = new function (){
	this.constructor = ASheet;
	this.add_row = function(row, row_num){
		this.sheet.insertRows(row, row_num);
	};

	this.add_col = function(col, col_num){
		this.sheet.insertColumns(col, col_num);
	};

	this.clear_data = function(rg_values){
		var rg = this.get_range(rg_values);
		rg.clearContent();
	};

	this.del_row = function(row, row_num){
		this.sheet.deleteRows(row, row_num);
	};
  
	this.del_col= function(col, col_num){
		if (col_num) this.sheet.deleteColumns(col, col_num);
	};

	// get range object
	this.get_range = function (rg_values){
		return this.sheet.getRange(
			rg_values.row, 
			rg_values.col, 
			rg_values.row_num, 
			rg_values.col_num
		);
	};

	// get data from a sheet 
	// rg_values is a object with 4 attributes: row, col, row_num, col_num
	// sheet is the object
	this.get_data = function(rg_values){
		var rg = this.get_range(rg_values);
        var values = rg.getValues();
		return values;
	
	};

	this.insert_data = function (values, rg_values){
		var rg = this.get_range(rg_values);
        
        try{
            rg.setValues(values);
        }
        catch(err){

            Logger.log(err);
            Logger.log(values);
            Logger.log(rg_values);
            Logger.log('error in insert_data');
            Logger.log('try to fix data is not the correct for [[]] error')
            rg.setValues([values]);
        }
	}; 
  
  	// need to test
	this.remove_blank = function(){
		var dtrange = this.sheet.getDataRange();
		var max_row = this.sheet.getMaxRows();

		var max_content_row = dtrange.getLastRow();

        if (max_content_row < max_row){
			sheet.deleteRows(max_content_row + 1, max_row - max_content_row);
        }
    }; 	

}();