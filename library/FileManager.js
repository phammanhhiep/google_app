// a layer that manage interaction of a google spreadsheet with environment which does NOT concern about data and structure within the file, but other aspects, like access permission and file moving 
function FileManager (file_id){
	if (this instanceof FileManager){
		this.file = DriveApp.getFileById(file_id);
	}
	else{
		return new FileManager(file_id)
	}
};

FileManager.prototype = Object.create(AFile.prototype, {constructor: {value: FileManager}});

FileManager.prototype.add_editor = function (email){
	this.file.addEditor(email);
};

FileManager.prototype.add_editors = function (emails){
	var num = emails.length;
	for (var i = 0; i < num; i++){
		this.add_editor (emails[i]);
	}
};

FileManager.prototype.get_folder_by_id = function (folder_id){
	this.folder = DriveApp.getFolderById(folder_id);
};

FileManager.prototype.make_copy = function (file_name, folder_id){
    var des_folder = folder_id ? DriveApp.getFolderById(folder_id) : this.folder;
	var copy = this.file.makeCopy(file_name, des_folder);
	return copy.getId()
};

FileManager.prototype.make_copies = function (file_names, folder_id){
	var num = file_names.length;
	for (var i = 0; i < num; i++){
		this.make_copy (file_names[i], folder_id);
	}
};

// remove access to the file 
FileManager.prototype.remove_editor = function (email){

};	
