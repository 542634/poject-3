require(["config"],function(){
	require(["jquery","tools","header","footer","indexImg"],function($,tools,header,footer){
		//异步加载header.html
//		tools.ajax("GET","/html/component/header.html",null,function(data){
//			document.getElementsByTagName("header")[0].innerHTML = data;
//		},false);
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				header.init();
				resolve();
			});
			$("footer").load("/html/component/footer.html",function(){
				footer.init();
			});
		}).then(function(){
			$(".indexImg").load("/html/component/indeximg.html",function(){
				//console.log();
				$(".slider").lunbo({
					goPrev:"goPrev",
					goNext:"goNext"
				})
			});
			
		}).then(function(){
			
		})
	})
})
