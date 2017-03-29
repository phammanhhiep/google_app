// represent a file
// keep track all sheets using the object.

function AFile(file_id){  
    if (this instanceof AFile){
        this.file_id = file_id ? file_id : 0;
        this.aSheets = {};
        this.get_spsh();
    }
    else{
        return new AFile(file_id)
    }
};


AFile.prototype = new function (){
    this.constructor = AFile;

    this.get_spsh = function(){
        if (this.file_id){
            this.spsh = SpreadsheetApp.openById(this.file_id);
        }
        else {
            this.spsh = SpreadsheetApp.getActiveSpreadsheet();
        }

        this.file_id = this.file_id ? this.file_id : this.spsh.getId()
    };

    this.get_all_sheets = function(){
        this.sheets = this.spsh.getSheets();
    }

    this.get_asheet_by_name = function(sheet_name){
        return this.create_aSheet(sheet_name)
    }
  
    // config = {sheet_name: somename}
    this.create_aSheet = function(sheet_name){

        if (!this.aSheets[sheet_name]){
            var sheet = this.spsh.getSheetByName(sheet_name);
            var aSheet_config = {
                sheet_name: sheet_name,
                sheet: sheet, 
            }

            this.aSheets[sheet_name] = new ASheet(sheet_name, sheet)
        }
    
        return this.aSheets[sheet_name] 
    };

    // make protection of a sheet or a range
    // return a protection object
    this.protect_sheet = function (sheet_name, rg_values, message){
        message = message ? message : 'protected';
        var asheet = this.get_asheet_by_name (sheet_name);
        var target = asheet.sheet;
        if (rg_values) {
            target = asheet.get_range(rg_values);
        }

        return target.protect().setDescription(message);
    }

    // must have sheet_names and rg_values, which are arrays
    // removed emails are applied to all sheets
    this.protect_sheets = function (sheet_names, rg_values, emails){
        var num = sheet_names.length;
        var prot = '';
        for (var i = 0; i < num; i++){
            prot = this.protect_sheet (sheet_names[i], rg_values[i]);
            if (emails){
                prot.removeEditors(emails);
            }
            
        }
    };

    this.toString = function (){
        return "AFile instance with ID of '{0}'".format(this.file_id)
    };
}();