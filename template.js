
var tplEngine = function(tpl, data){

	var regTemp = /<%([^%>]+)?%>/g;

	// ^( )? 确保正则表达式只匹配一行，回车后的字符不匹配
	var regControl = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/;

	var code = "var r = [];\n";

	function Add(str, js){
		code += js ? 
				(
					regControl.exec(str) ? 
					str+'\n' : 
					'r.push('+str+');\n'
				) : 
				(
					str ? 
					'r.push("'+str.replace(/"/g, '\\"')+'");\n' :
					''
				);
		return Add;
	}

	var index = 0;
	while(match = regTemp.exec(tpl)){

		Add(tpl.slice(index, match.index))(match[1], true);
		index = match.index + match[0].length;
	}
	Add(tpl.slice(index));
	
	code += 'return r.join("");';

	var generateHtmlStr = new Function('data', code.replace(/[\r\t\n]/g, ''));

	var htmlStr = generateHtmlStr(data);

	return htmlStr;
};

module.exports = tplEngine;