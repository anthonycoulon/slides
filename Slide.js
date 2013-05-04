/* 
---------------------------------------
author : Anthony Coulon
email : coulon.anthony@gmail.com
Slide javascript API for HTML5 page
--------------------------------------- 
*/

Slide = function(_options) {
	
	this.options = $.extend({}, {
		style:'slide',
		width:'900px',
		height:'600px',
		marginTop:'-350px',
		marginLeft:'-475px',
		padding:'30px',
		backgroundColor:'white',
		border:'none'
	}, _options);

	this.init();
};

Slide.prototype.init = function() {
	this.initClassSlide();
	this.initActionSlide();

	$('section#container').append('<section id="landmark"></section>');
	this.initLandmark();

	$('article')
		.css('width', this.options.width)
		.css('height', this.options.height)
		.css('margin-top', this.options.marginTop)
		.css('margin-left', this.options.marginLeft)
	 	.css('padding', this.options.padding)
	 	.css('background-color', this.options.backgroundColor)
	 	.css('border', this.options.border);
};

Slide.prototype.initClassSlide = function() {
	var articles = $('article');
	$(articles[0]).toggleClass('current');
	$(articles[1]).toggleClass('next_'+this.options.style);
	for(var i=2; i<articles.length; i++){
		$(articles[i]).toggleClass('far_next');
	}
};

//--- hack for demo :
Slide.prototype.resetClassSlide = function() {
	var articles = $('article');
	for(var i=0; i<articles.length; i++){
		$(articles[i]).removeAttr('class');
	}
};
//---

Slide.prototype.initActionSlide = function() {
	
	$(document).click(bind(this,function(_event) {
		var position = _event.pageX;
		var width = $('body').width();

		//--- hack for demo : 
		var style=$('input[name=style]').val();
		if(style=='slide' || style=='cube' || style=='rotate'){
			this.resetClassSlide();
			this.options.style=style;
			this.initClassSlide();
			$('input[name=style]').val('');
		}
		//---

		if(position<width/2){
			this.previous();
		}else {
			this.next();
		}
	}));

	$(document).keydown(bind(this,function(_event){
		var code = (_event.keyCode ? _event.keyCode : _event.which);

		//--- hack for demo : 
		if(code==39 || code==37){
			var style=$('input[name=style]').val();
			if(style){
				this.resetClassSlide();
				this.options.style=style;
				this.initClassSlide();
				$('input[name=style]').val('');
			}
		}
		//---

		if(code==39){
			this.next();
		}else if(code==37) {
			this.previous();
		}
	}));
};

Slide.prototype.initLandmark = function () {
	var articles = $('article');
	$('section#landmark').empty();
	for(var i=0;i<articles.length;i++){
		if($(articles[i]).attr('class')=='current'){
			$('section#landmark').append('<span class="current"></span>');
		}else {
			$('section#landmark').append('<span></span>');
		}
	}
};
Slide.prototype.next = function(_event) {
	if($('article.next_'+this.options.style).length>0){

		$('article.next_'+this.options.style).toggleClass('next_'+this.options.style+' current');
				
		$('article.past_'+this.options.style).toggleClass('past_'+this.options.style+' far_past');

		$($('article.current')[0]).toggleClass('current past_'+this.options.style);

		$($('article.far_next')[0]).toggleClass('far_next next_'+this.options.style);
				
		this.initLandmark();	
	}
};
Slide.prototype.previous = function(_event) {
	if($('article.past_'+this.options.style).length>0){

		$('article.past_'+this.options.style).toggleClass('past_'+this.options.style+' current');
		
		$('article.next_'+this.options.style).toggleClass('next_'+this.options.style+' far_next');

		$($('article.current')[1]).toggleClass('current next_'+this.options.style);
		
		$($('article.far_past')[$('article.far_past').length-1]).toggleClass('far_past past_'+this.options.style);

		this.initLandmark();
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
