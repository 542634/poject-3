require(["config"],function(){
	require(["jquery","header","footer","template","cookie"],function($,header,footer,template,cookie){
		$("header").load("/html/component/header.html",function(){
			header.init();
		});
		
		$("footer").load("/html/component/footer.html",function(){
			footer.init();
		});
		
		$(".login-title h2").click(function(){
			$(this).addClass("ac").siblings().removeClass("ac");
		});
		console.log($(".form"));
		//数据提交 查找数据库 对比 成功就登录成功
		$(".form").submit(function(e){
			
			e = e ||event;
			
			var data = {
				phoneNumber:$(".phoneNumber").val(),
				passWord:$(".passWord").val()
				
			}
			$.ajax({
				type:"post",
				data:data,
				dataType:"json",
				url:"http://localhost/project-gtx/api/V1/login.php",
				success:function(res){
					console.log(res);
					if(res.code === 1){
						alert("登录成功");
						$.cookie("userName",res.project[0].phoneNumber,{
							path:"/"
						})
						location.href="http://localhost:4444/index.html";
					}else{
						alert("用户名或密码错误，请重试");
					}
				}
			})
			
				e.preventDefault();
				return false;
		})
	})
})