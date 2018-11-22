require(["config"],function(){
	require(["jquery","header","footer","template"],function($,header,footer,template){
		$("header").load("/html/component/header.html",function(){
			header.init();
		});
		$("footer").load("/html/component/footer.html",function(){
			footer.init();
		});
//		
		var big_box = $("#big-box"),
			img_big = $(".img-big"),
			smallbox = $("#smallbox"),
			bigimg = $("#big-box img");
//			
//			
//			
//			
			var str = location.search.slice(1),
				arr = str.split("=");
				
			var obj = {};
				obj[arr[0]]=arr[1];
			$.ajax({
				type:"POST",
				data: obj ,
				url:"http://localhost/project-gtx/api/V1/product.php",
				dataType:"json",
				success:function(res){
//					//console.log(res)
					var html = template("html-script",{products:res.project});
//					
					$(".product-box").html(html);
//					
					
					$(".img-big").mousemove(function(e){
						e = e || event;
						
						var _left = e.pageX - $("#smallbox").width()/2 - $(".img-big").offset().left; 
							_top = e.pageY - $("#smallbox").height()/2 - $(".img-big").offset().top;
							if(_left < 0) _left = 0;
							if(_top < 0) _top = 0;
							if(_left > $(".img-big").width()-$("#smallbox").width()) _left = $(".img-big").width()-$("#smallbox").width();
							if(_top > $(".img-big").height()-$("#smallbox").height()) _top = $(".img-big").height()-$("#smallbox").height();
							
						$("#smallbox").css({
							"display":"block",
							"left":_left,
							"top":_top
						})
						
						$("#big-box").css({
							"display":"block",
							
						})
						$("#big-box img").css({
							"left":-2.9126*_left,
							"top":-2.9126*_top
						})
						
					})
					
					$(".img-big").mouseleave(function(){
						$("#big-box").css({
							"display":"none",
						})
						
						$("#smallbox").css({
							"display":"none",
						})
					})
					
//					//小图加ac
					$(".img-small li").hover(function(){
						$(this).addClass("b-red").siblings().removeClass("b-red");
					})
					$(".img-small li img").hover(function(){
						$(".img-big img").attr("src",$(this).attr("src"));
						$("#big-box img").attr("src",$(this).attr("src"));
						
					})
//					
//					
//					//鞋码加ac
					$(".size li").click(function(){
						$(this).toggleClass("ac").siblings().removeClass("ac");
					})
					
					//点击数量加减
					$(".down").click(function(){
						var num = $("#num").val();
							num--;
							if(num < 1) num = 1;
						$("#num").val(num);
					})
					
					
					$(".up").click(function(){
						var num = $("#num").val();
							num++;
							if(num >=10) num = 10;
						$("#num").val(num);
					})
//					
//					
//					//加入购物车 存cookie
						var arr = [];
						var cart = $.cookie("cart");
							console.log(cart);
						if(cart){
							arr = JSON.parse(cart);
						}
					 
						console.log(arr);
					$(".addcart").click(function(){
					for(var i = 0;i < arr.length; i++){
						if(arr[i].id == res.project[0].id){
							arr[i].num++;
							break;
						} 
					
					}
////							
					if(i === arr.length){
						var obj={
							id:res.project[0].id,
							name:res.project[0].name,
							price:res.project[0].price,
							color:res.project[0].color,
							img:res.project[0].img1,
							num:$("#num").val(),
							size:$(".size .ac").html()
						}
					
						arr.push(obj);
					}
////						//存cookie
						var str = JSON.stringify(arr);
						
						//alert("添加购物车成功");
						if(confirm("添加购物车成功,是否前往购物车?")){
						location.href="http://localhost:4444/html/shoppingcar.html";
						}
						$.cookie("cart",str,{
								path:"/",
								expires:7
						});
						
						
				})
					
					
////					
				}
		});
//			
	})
})