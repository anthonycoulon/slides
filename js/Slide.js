// author Anthony Coulon

Slide = function() {
	this.initActionSlide();
	this.initRepere();
};

Slide.prototype.initActionSlide = function() {
	
	$('section').click(bind(this,function(_event) {
		var position = _event.pageX;
		var width = $('body').width();
		if(position<width/2){
			this.previous();
		}else {
			this.next();
		}
	}));

	$(document).keydown(bind(this,function(_event){
		var code = (_event.keyCode ? _event.keyCode : _event.which);
		console.log(code);
		if(code==39){
			this.next();
		}else if(code==37) {
			this.previous();
		}
	}));
};

Slide.prototype.initRepere = function () {
	var articles = $('article');
	$('section#repere').empty();
	for(var i=0;i<articles.length;i++){
		if($(articles[i]).attr('class')=='current'){
			$('section#repere').append('<img src="img/slide_rondB.png"/>');
		}else {
			$('section#repere').append('<img src="img/slide_rondG.png"/>');
		}
	}
};

Slide.prototype.next = function(_event) {
	if($('article.next').length>0){
		$('article.next').toggleClass('next current');
		
		$('article.past').toggleClass('past far_past');

		$($('article.current')[0]).toggleClass('current past');

		setTimeout(function() {
			$($('article.far_next')[0]).toggleClass('far_next next');
		},270);	

		this.initRepere();	
	}
};
Slide.prototype.previous = function(_event) {
	if($('article.past').length>0){
		$('article.past').toggleClass('past current');
		
		$('article.next').toggleClass('next far_next');

		$($('article.far_past')[$('article.far_past').length-1]).toggleClass('far_past past');

		$($('article.current')[1]).toggleClass('current next');

		this.initRepere();
	}
};