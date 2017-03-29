// connnect to a mysql database
function ADb (host, db, user, passwd){
	if (this instanceof ADb){
		this.host = host;
		this.db = db;
		this.user = user;
		this.passwd = passwd;
		this.sso = new SqlStmtObject ();		
	}
	else{
		return new Adb(host, db, user, passwd)
	}
};

ADb.prototype = new function(){
	this.constructor = ADb;

	this.connect = function (){ 
        var dbUrl = 'jdbc:mysql://' + this.host + '/' + this.db;
		return Jdbc.getConnection(dbUrl, this.user, this.passwd);
	};

	// return an array of array.
	this.get_result = function (results){
		var data = [];
		var col_num = results.getMetaData().getColumnCount();
		while (results.next()){
			var row_data = [];

			for(var i = 0; i < col_num; i++){
				row_data.push(results.getString(i + 1));
			}

			data.push(row_data);
		}

		return data 
	};

	// call after add attr, tables, and (or) conds
	this.get_count = function (){
		

	}

	// stmt_components = {attrs: [], tables: [], conds: []}
	this.create_stmt = function (stmt_components){
		this.sso.add_attrs (stmt_components.attrs);
		this.sso.add_tables (stmt_components.tables);
		this.sso.add_conds (stmt_components.conds);
		return this.sso.create_stmt ()
	};

	// fetch with max of 1000. If exceed, drop the rest of data
	this.fetch = function (stmt, maxrows){
		maxrows = (maxrows || maxrows == 0) ? maxrows : 1000;
		var conn = this.connect();
	  	var stmtObj = conn.createStatement();
	  	stmtObj.setMaxRows(maxrows);
	 	return stmtObj.executeQuery(stmt);		
	};

	// fetch all data.
	// fetch max rows then combine them together
	// stmt_components = {attrs: [], tables: [], conds: []}
	// used only for incremented id
	// Later
	this.fetch_all = function (stmt_components, id_name, maxrows){
		maxrows = maxrows ? maxrows : 1000;
		var stmt = this.create_stmt (stmt_components);
		var prev_select = this.sso.reset_select (['COUNT(*)'])
		var count_stmt = this.sso.create_stmt ();
		var res = this.fetch(count_stmt);
		res.next();
		var count = res.getInt(1);
        
		this.sso.reset_select (prev_select);
		stmt = this.sso.create_stmt (); 

        if (!count){
        	return
        }

        var num = Math.ceil(count / maxrows);
        var data = [];
        var res = '';
        for (var i = 0; i < num; i++){
        	res = this.fetch

        }

	};

	this.insert = function (){

	};

	this.update = function (){

	};	
}();