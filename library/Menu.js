function Menu(menu_name){
	this.menu_name = menu_name;
	this.create_menu = function (names, actions){
		var ui = SpreadsheetApp.getUi();
		var menu = ui.createMenu(this.menu_name);

		var num = names.length;
		for (var i = 0; i < num; i++){
			menu.addItem(names[i], actions[i]);
		}

		menu.addToUi();
	}
}