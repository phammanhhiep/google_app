String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
}
//
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
}
//
Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

var libs = new Libs();

// namespace for mixed custom functions
function Libs (){
    if (!(this instanceof Libs)){
        return new Libs
    }
};  

Libs.prototype = new function (){
    this.constructor = Libs;

    // shalow copy properties of a object and put into another object
    this.mixin = function (receiver, supplier){
        for (var property in supplier){
            if (supplier.hasOwnProperty(property)){
                receiver[property] = supplier[property]; 
            }
        }
    };

    this.day_num_in_month = function (y, m) {
      // m is the true value of a month. for example, 9 = September. 
      return new Date(y, m, 0).getDate(); 
    };

    //
    this.day_num_in_month2 = function (aDate) {
      return new Date(aDate.getFullYear(), aDate.getMonth() + 1, 0).getDate(); 
    };
    //
    this.add_date = function (curr_date, num){
        var new_date = new Date(curr_date);
        new_date.setDate(curr_date.getDate() + num);
        return new_date
    };

    this.gen_date = function (y,m,d){
        var target_date = '';
        var last_date = new Date(y, m + 1, 0);
       
        if (last_date.getDate() < d){
            target_date = last_date;
        }
        else{
            target_date = new Date(y,m,d);
        }

        return target_date
    }

    this.get_datetime_now_str = function () {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        
        if(month.toString().length == 1) {
            var month = '0'+month;
        }
        if(day.toString().length == 1) {
            var day = '0'+day;
        }   
        if(hour.toString().length == 1) {
            var hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
            var minute = '0'+minute;
        }
        if(second.toString().length == 1) {
            var second = '0'+second;
        }   
        var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   

        return dateTime;
    }

    this.add_month = function (curr_date, num){
        var new_date = new Date(curr_date);
        var last_date = '';
        // test if the date of new_date exits in the next or previous month 
        // test the date of new_date against the last date of the next or previous month
        // if smaller, then do nothing, but if greater, return the last date of next or previous month
        last_date = new Date(new_date.getFullYear(), new_date.getMonth() + num + 1, 0);
        if (last_date.getDate() < new_date.getDate()){
            new_date.setDate(last_date.getDate());
        }

        new_date.setMonth(curr_date.getMonth() + num);
        return new_date
    };

    //
    this.from_date_to_string = function (target_date){
        // GET YYYY, MM AND DD FROM THE DATE OBJECT
        var yyyy = target_date.getFullYear().toString();
        var mm = (target_date.getMonth()+1).toString();
        var dd  = target_date.getDate().toString();
        // CONVERT mm AND dd INTO chars
        var mmChars = mm.split('');
        var ddChars = dd.split('');     
        // CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
        var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
        return datestring
    };  

    this.get_diff_date = function (first, second){
        var timeDiff = Math.abs(first.getTime() - second.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays
    };

    this.from_obj_to_urlparam = function (obj){
        var str = "";
        for (var key in obj) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(obj[key]);
        }

        return str    
    };

    this.from_obj_to_value_array = function (obj){
        return Object.keys(obj).map(function (key) { return obj[key]; });
    }

    this.from_obj_to_key_array = function (obj){
        return Object.keys(obj)
    }

    // restrict to 2 dimensional array
    this.from_array_to_multi_array = function (arr){
        return arr.map(function (val) {return [value]})
    };

    // add a value or an array of values into a 2-dimensional array [[], [], ..., []]
    this.add_mid_2d_array = function (target_array, values, index){
        var num = target_array.length;
        var val_num = values.length;
        var copy = target_array.map(function (x){return x.slice(0)});
        index = index ? index : target_array[0].length;
        var val = ''; 

        for (var i = 0; i < num; i++){
            val = val_num > 1 ? values[i] : values[0]
            target_array[i].splice(index, 0, val);
        } 
        return copy   
    };
}


