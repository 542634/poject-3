require(["config"],function(){
	require(["jquery","header","footer","template"],function($,header,footer,template){
		$("header").load("/html/component/header.html",function(){
			header.init();
		});
		
		$("footer").load("/html/component/footer.html",function(){
			footer.init();
		});
		
		//数据提交 插入数据库
		$("#form").submit(function(e){
			
			e = e ||event;
			var passWord2 = $(".passWord2").val();
			var data = {
				phoneNumber:$(".phoneNumber").val(),
				passWord:$(".passWord").val()
				
			}
			console.log(data);
			var reg = /^1\d{10}$/;
			var reg2 =/^\w{8,20}$/;
				if(!reg.test(data.phoneNumber)){
					alert("请输入正确的手机号码 ")
					return false;
				}
				if(!reg2.test(data.passWord)){
					alert("请按规范设置密码 ")
					return false;
				}
				if( passWord2!= data.passWord){
					alert("两次输入的密码不一致，请从新输入")
					return false;
				}
			$.ajax({
				type:"post",
				data:data,
				dataType:"json",
				url:"http://localhost/project-gtx/api/V1/register.php",
				success:function(res){
					if(res.code === 1){
						alert("注册成功");
						location.href="http://localhost:4444/html/login.html";
					}else{
						alert("注册失败，请重试");
					}
				}
			})
			
				e.preventDefault();
				return false;
		})
	})
})