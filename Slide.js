// author Anthony Coulon

Slide = function(_style) {
	this.style = _style;

	this.initClassSlide();
	this.initActionSlide();
	this.initRepere();
};

Slide.prototype.initClassSlide = function() {
	var articles = $('article');
	$(articles[0]).toggleClass('current');
	$(articles[1]).toggleClass('next_'+this.style);
	for(var i=2; i<articles.length; i++){
		$(articles[i]).toggleClass('far_next');
	}
};

Slide.prototype.initActionSlide = function() {
	
	$(document).click(bind(this,function(_event) {
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
			$('section#repere').append('<span class="current"></span>');
		}else {
			$('section#repere').append('<span></span>');
		}
	}
};
Slide.prototype.next = function(_event) {
	if($('article.next_'+this.style).length>0){

		$('article.next_'+this.style).toggleClass('next_'+this.style+' current');
				
		$('article.past_'+this.style).toggleClass('past_'+this.style+' far_past');

		$($('article.current')[0]).toggleClass('current past_'+this.style);

		$($('article.far_next')[0]).toggleClass('far_next next_'+this.style);
				
		this.initRepere();	
	}
};
Slide.prototype.previous = function(_event) {
	if($('article.past_'+this.style).length>0){

		$('article.past_'+this.style).toggleClass('past_'+this.style+' current');
		
		$('article.next_'+this.style).toggleClass('next_'+this.style+' far_next');

		$($('article.current')[1]).toggleClass('current next_'+this.style);
		
		$($('article.far_past')[$('article.far_past').length-1]).toggleClass('far_past past_'+this.style);

		this.initRepere();
	}
};


// BIND
function bind(objet, methode) {
    return function() { 
        return methode.apply(objet, arguments);
    }; 
};

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}