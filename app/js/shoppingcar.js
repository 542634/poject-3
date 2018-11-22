require(["config"],function(){
	require(["jquery","header","footer","template"],function($,header,footer,template){
		$("header").load("/html/component/header.html",function(){
			header.init();
		});
		
		$("footer").load("/html/component/footer.html",function(){
			footer.init();
		});
		
//		$.cookie.json = true;

		var cart = $.cookie("cart");
		//console.log(cart);
		var res = JSON.parse(cart);
		//console.log(res.length);
		if(cart  == null ||res.length==0){
			
			$(".cart-empty").css({
				"display":"block",
				
			})
			$(".steps").css({
				"display":"none",
				
			})
			$(".cart-container").css({
				"display":"none",
			})
			$(".youlike").css({
				"display":"block",
			})
		}else{
			var res = JSON.parse(cart);
			
			
		 	var html = template("html-script",{products:res})
		 	
		 	$("#html-template").html(html);
		}
		
//						var allNum = 0;
//						var num = 0;
//						var _checked = $("dd .checked:checked");
//					 	for( var i = 0;i < _checked.length;i++){
//					 	//console.log(_checked.length)
//						var pri = $(this).parent().parent().find("#onePrice em").html();
//						var num = $(this).parent().parent().find(".num input[type=text]").val();
//					 	sum = pri * num;
//					 	allNum = allNum + sum;
//					 	//console.log(sum);
//					 }
//					$("#products-price").html("￥"+ allNum + ".00");
//					$("#allProduct-price").html("￥"+ allNum + ".00");
		
		//全选和反选
			sum();
			var len = $(".checked").length;
			var _sum = len;
			$(".allchecked").click(function(){
				var checked = $(".allchecked").prop("checked");
				if(checked){
					
					_sum = len;
					$(".checked").prop("checked",true);
					sum();	
						
				}else{
					_sum = 0;
					$(".checked").prop("checked",false);
					sum();
				}
				
			})
			
				$(".checked").click(function(){
					sum();
					if($(this).prop("checked")){
						_sum++;
						
					}else{
						_sum--;
					}
					if(_sum == len){
						$(".allchecked").prop("checked",true);
					}
					if(_sum < len){
						
						$(".allchecked").prop("checked",false);
						
					}
				})
				
				
				
				//数量按钮的加减
				//console.log(res);
				$(".down").click(function(){
					
				var val = $(this).next().val();
					val--;
					
					if(val < 1){
					alert("该宝贝不能再少了哟 ！亲");
					val = 1;
					}
					$(this).next().val(val);
					sum();
					for(var i = 0; i < res.length; i++){
						if($(this).parent().parent().attr("data-id") == res[i].id){
							res[i].num = val;
						$(this).parent().parent().find("#allprice em").html(res[i].num*res[i].price + ".00");
						var allNum = 0;
						var num = 0;
							
						}
					}
					
					var str = JSON.stringify(res);
					$.cookie("cart",str,{
								path:"/",
								expires:7
						});
					
					
				})
				
				$(".up").click(function(){
				
				var val = $(this).prev().val();
					val++;
					$(this).prev().val(val); 
					sum();
					for(var i = 0; i < res.length; i++){
					var _id = $(this).parent().parent().attr("data-id");
						if(_id == res[i].id){
							res[i].num = val;
						//console.log(res);
						//console.log(res[i]);
						$(this).parent().parent().find("#allprice em").html(res[i].num*res[i].price + ".00");
						
						}
					}
					
					var str = JSON.stringify(res);
					$.cookie("cart",str,{
								path:"/",
								expires:7
						});
					
				})
				
				
		
			
		//var product_price =$("#html-template dd p:nth-child(6) ");
		//console.log(product_price.text());
		 //var allnum = product_price.text().slice(1);
			//console.log(res);
			
		
		
		//点击移除商品 删除json里的数据 重新存cookie
		$(".remove").click(function(){
			//console.log(res);
			if(confirm("你确定要移除该商品吗？亲")){
				$(this).parent().parent().remove();
				
				for(var i = 0; i < res.length; i++){
				
					var _id = $(this).parent().parent().attr("data-id");
						if(_id == res[i].id){
							
							res.splice(i,1);//开始位置,删除个数
							 if(res.length == 0){
							 	//console.log(1111)
							 	$(".cart-empty").css({
									"display":"block",
									
								})
								$(".steps").css({
									"display":"none",
									
								})
								$(".cart-container").css({
									"display":"none",
								})
								$(".youlike").css({
									"display":"block",
								})
							 }
						}
					}
//						var allNum = 0;
//						var num = 0;
//					 for( var i = 0;i < res.length;i++){
//						
//					 	num = res[i].price * res[i].num;
//					 	allNum = allNum +num;
//					 }
//					$("#products-price").html("￥"+ allNum + ".00");
//					$("#allProduct-price").html("￥"+ allNum + ".00");
					sum();
						
						var str = JSON.stringify(res);
								$.cookie("cart",str,{
											path:"/",
											expires:7
								});
			}
		})
		
		//点击编辑
		$(".edit").click(function(){
			$(this).parent().find(this).hide();
			$(this).parent().find(".size").hide();
			$(this).parent().find(".color").hide();
			$(this).parent().find(".isize").show().val($(".size").html());
			$(this).parent().find(".icolor").show().val($(".color").html());
			$(this).parent().find(".okBtn").show();
			$(this).parent().find(".cancel").show();
		})
		//点击确定
		$(".okBtn").click(function(){
			$(this).parent().find(this).hide();
			$(this).parent().find(".isize").hide();
			$(this).parent().find(".icolor").hide();
			$(this).parent().find(".size").show().html($(".isize").val());
			$(this).parent().find(".color").show().html($(".icolor").val());
			$(this).parent().find(".edit").show();
			$(this).parent().find(".cancel").hide();
		})
		//点击取消
		$(".cancel").click(function(){
			$(this).hide();
			$(this).parent().find(".isize").hide();
			$(this).parent().find(".icolor").hide();
			$(this).parent().find(".size").show();
			$(this).parent().find(".color").show();
			$(this).parent().find(".edit").show();
			$(this).parent().find(".okBtn").hide();
		})
		
		
		function sum(){
				
				var Sum = 0;
				var _checked = $("dd .checked:checked");
				console.log(_checked);
				
			_checked.each(function(index, element) {
				var pri = $(this).parents("dd").find("#onePrice em").text();
				var num = $(this).parents("dd").find(".num input").val();
				console.log(pri);
				console.log(num);
				Sum += pri * num;
			});
				
				
			 /*for( var i = 0;i < _checked.length;i++){
			 	
			 	var pri = _checked.eq(i).parent().parent().find("#onePrice em").html();
				var num = _checked.eq(i).parent().parent().find(".num input[type=text]").val();
				
			 	Sum += pri * num;
			 	
			 }*/
//			 allSum = allSum + Sum;
			rendSum(Sum);
		}
		
		function rendSum(Sum) {
			$("#products-price").html("￥"+ Sum.toFixed(2));
			$("#allProduct-price").html("￥"+ Sum.toFixed(2))
		}
	})
})