function SqlStmtObject (attrs, tables, conds){
	this.init = function (attrs, tables, conds){
		this.select_stmt = '';
		this.from_stmt = '';
		this.where_stmt = '';

		if (attrs) this.add_attrs (attrs);
		if (tables) this.add_tables (tables);
		if (conds) this.add_conds (conds);

		this.template = '' + 			
			'SELECT {0} ' + // {0} column names
			'FROM {1} ' + // {1} = table names
			'WHERE TRUE {2} {3}' // {2} = AND {3} = condition
	};

	this.add_attrs = function(attrs){
		attrs = (attrs && attrs.length) ? attrs : [''];
		var attr_str = attrs.join(',');
		this.select_stmt = (this.select_stmt + ((this.select_stmt && attr_str) ? ',' : '') + attr_str).trim()
	};

	// inner join only
	this.add_tables = function (tables){
		tables = (tables && tables.length) ? tables : [''];
		var num = tables.length;
		for (var i = 0; i < num; i ++){
			this.from_stmt = '{0} {1}'.format(this.from_stmt, tables[i]).trim()
		}
	};

	this.add_conds = function (conds){
		conds = (conds && conds.length) ? conds : [''];
		var num = conds.length;
		for (var i = 0; i < num; i ++){
			this.where_stmt = '{0} {1} {2}'.format(this.where_stmt, ((this.where_stmt && conds[i]) ? 'AND' : ''), conds[i]).trim()
		}
	};

	// raise exception if select_stmt or from_stmt is empty
	this.create_stmt = function (sso){
		if (sso){
			return sso.create_stmt ()
		}
		else {
			return this.template.format(
				this.select_stmt, 
				this.from_stmt, 
				(this.where_stmt ? 'AND' : ''),
				this.where_stmt
			);
		}
	};

	this.reset_select = function (new_attrs){
		var prev = [this.select_stmt];
		this.select_stmt = '';
		this.add_attrs(new_attrs);
		return prev
	};

	this.reset_from = function (new_tables){
		var prev = [this.from_stmt];
		this.from_stmt = '';
		this.add_tables(new_tables);
		return prev
	};

	this.reset_where = function (new_conds){
		var prev = [this.where_stmt];
		this.where_stmt = '';
		this.add_conds(new_conds);
		return prev
	};

	this.init (attrs, tables, conds);

}