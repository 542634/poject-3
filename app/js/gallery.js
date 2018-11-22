require(["config"],function(){
	require(["jquery","header","footer","template"],function($,header,footer,template){
		$("header").load("/html/component/header.html",function(){
			header.init();
		});
		$("footer").load("/html/component/footer.html",function(){
			footer.init();
		});
		
		$.ajax({
			type:"GET",
			url:"http://localhost/project-gtx/api/V1/select.php",
			dataType:"json",
			success:function(res){
				//console.log(res);	
			var html = template("html-script",{products:res.project});
			//console.log(html);
			
			$("#html-template").html(html);
			
			console.log(res.project);
			
			//console.log($("#html-template li"));
			
			//滑过li出现快速购买
					$("#html-template li").hover(function(){
						
					$(this).find(".fastbuy").css({
						"display":"block",
					})
				},function(){
					$(this).find(".fastbuy").css({
						"display":"none",
					})
				})
			//滑过图片换图
				$("#html-template li").find("img").hover(function(){
					
					$(this).attr({
						"datasrcs":$(this).attr("src"),
						"src":$(this).attr("datasrc"),
						"datasrc":$(this).attr("datasrcs")
					})
					
				},function(){
					$(this).attr({
						"datasrc":$(this).attr("src"),
						"src":$(this).attr("datasrcs"),
						"datasrcs":$(this).attr("datasrc")
					})
				})
			
			}
		})
		
		
		$(".gallery-article").find("a").click(function(){
			$(this).toggleClass("red").siblings().removeClass("red");
		})
		
		$(".listtitle").on("click",function(){
			$(this).toggleClass("bg");
			$(this).siblings().toggle();
		});
		
		$("#morecolor").click(function(){
			$("#color").css({
				"overflow":"auto"
			})
		})
		$(document).scroll(function(){
			if($(this).scrollTop() > 310){
			var _height = $(".gallery-filter-list").height();
				$(".gallery-filter-list").css({
					"position":"fixed",
					"top":"70px",
				})
				//console.log(_height);
				
				
				//console.log($(this).scrollTop());
				
				//console.log($(".gallery-item-list").height());
				
				if($(this).scrollTop() > $(".gallery-item-list").height() - _height){
					
					$(".gallery-filter-list").css({
					"position":"absolute",
					"top":$(".gallery-item-list").height()-_height,
				})
				}
			}else{
				$(".gallery-filter-list").css({
					"position":"absolute",
					"top":"340px"
				})
			}
			
		})
		
		
	})
})
	
