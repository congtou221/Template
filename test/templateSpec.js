var expect = require('chai').expect;
var template = require('../template.js');

describe('Template', function(){
	describe('#tplEngine()', function(){
		it('should get data from javascript object', function(){
			var data = {'name': 'Mary'};
			var tpl = '<%data.name%>';

			var result = template(tpl, data);

			expect(result).to.equal('Mary');
		})
		it('should join html Element with javascript data', function(){
			var data = {'name': 'Mary'};
			var tpl = '<p>My name is <%data.name%>.</p>';

			var result = template(tpl, data);

			expect(result).to.equal('<p>My name is Mary.</p>');
		})
		it('should support switch control logic', function(){
			var data = {'name': 'Mary',
						'tags': ['singing', 'dancing', 'climbing', 'reading'],
						'day': 0,
						'sex': 'female'
						};
			var tpl = '<%switch (data.day){case 0:day = "Sunday";break;case 1:day = "Monday";break;case 2:day =  "Tuesday";break;case 3:day = "Wednesday";break;case 4:day = "Thursday";break;case 5:day = "Friday";break;case 6:day = "Saturday";break;}%><p>Today is <%day%>.</p>';

			var result = template(tpl, data);

			expect(result).to.equal('<p>Today is Sunday.</p>')
		})
		it('should support for control logic', function(){
			var data = {'tags': ['singing', 'dancing', 'climbing', 'reading']};
			var tpl = '<%for(var i = 0, len = data.tags.length; i < len; i++){%><span><%data.tags[i]%></span><%}%>';

			var result = template(tpl, data);

			expect(result).to.equal('<span>singing</span><span>dancing</span><span>climbing</span><span>reading</span>')
		})
		it('should support if control logic', function(){
			var data = {'sex': 'female'};
			var tpl = '<p>I am a <%if(data.sex === "female"){%>woman<%}else{%>man<%}%>.</p>';

			var result = template(tpl, data);
			expect(result).to.equal('<p>I am a woman.</p>');
		})
	})
})