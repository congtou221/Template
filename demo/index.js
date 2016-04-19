var data = [
			{'name': 'Mary', 'age': 21},
			{'name': 'Sara', 'age': 33},
			{'name': 'Kate', 'age': 28}
			];
var tpl = document.getElementById("template-id").innerHTML;	

var container = document.getElementById("container");

container.innerHTML = tplEngine(tpl, data);