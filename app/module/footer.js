define(["jquery"],function($){
	function Footer(){
	}
	Footer.prototype.init = function(){
		$(".china").click(function(){
			$("#country").css({
			"left": $(".china").offset().left,
			"top": $(".china").offset().top - $("#country").height()
				})
			$("#country").toggle();
		});
	}
	return new Footer();
})
		
			


