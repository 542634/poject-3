require(["config"],function(){require(["jquery","header","footer","template"],function(r,e,i,t){r("header").load("/html/component/header.html",function(){e.init()}),r("footer").load("/html/component/footer.html",function(){i.init()});var n=r.cookie("cart"),c=JSON.parse(n);if(null==n||0==c.length)r(".cart-empty").css({display:"block"}),r(".steps").css({display:"none"}),r(".cart-container").css({display:"none"}),r(".youlike").css({display:"block"});else{var a=t("html-script",{products:c=JSON.parse(n)});r("#html-template").html(a)}s();var o=r(".checked").length,h=o;function s(){var e,c=0,i=r("dd .checked:checked");console.log(i),i.each(function(e,i){var t=r(this).parents("dd").find("#onePrice em").text(),n=r(this).parents("dd").find(".num input").val();console.log(t),console.log(n),c+=t*n}),e=c,r("#products-price").html("￥"+e.toFixed(2)),r("#allProduct-price").html("￥"+e.toFixed(2))}r(".allchecked").click(function(){r(".allchecked").prop("checked")?(h=o,r(".checked").prop("checked",!0)):(h=0,r(".checked").prop("checked",!1)),s()}),r(".checked").click(function(){s(),r(this).prop("checked")?h++:h--,h==o&&r(".allchecked").prop("checked",!0),h<o&&r(".allchecked").prop("checked",!1)}),r(".down").click(function(){var e=r(this).next().val();--e<1&&(alert("该宝贝不能再少了哟 ！亲"),e=1),r(this).next().val(e),s();for(var i=0;i<c.length;i++)if(r(this).parent().parent().attr("data-id")==c[i].id){c[i].num=e,r(this).parent().parent().find("#allprice em").html(c[i].num*c[i].price+".00")}var t=JSON.stringify(c);r.cookie("cart",t,{path:"/",expires:7})}),r(".up").click(function(){var e=r(this).prev().val();e++,r(this).prev().val(e),s();for(var i=0;i<c.length;i++){r(this).parent().parent().attr("data-id")==c[i].id&&(c[i].num=e,r(this).parent().parent().find("#allprice em").html(c[i].num*c[i].price+".00"))}var t=JSON.stringify(c);r.cookie("cart",t,{path:"/",expires:7})}),r(".remove").click(function(){if(confirm("你确定要移除该商品吗？亲")){r(this).parent().parent().remove();for(var e=0;e<c.length;e++){r(this).parent().parent().attr("data-id")==c[e].id&&(c.splice(e,1),0==c.length&&(r(".cart-empty").css({display:"block"}),r(".steps").css({display:"none"}),r(".cart-container").css({display:"none"}),r(".youlike").css({display:"block"})))}s();var i=JSON.stringify(c);r.cookie("cart",i,{path:"/",expires:7})}}),r(".edit").click(function(){r(this).parent().find(this).hide(),r(this).parent().find(".size").hide(),r(this).parent().find(".color").hide(),r(this).parent().find(".isize").show().val(r(".size").html()),r(this).parent().find(".icolor").show().val(r(".color").html()),r(this).parent().find(".okBtn").show(),r(this).parent().find(".cancel").show()}),r(".okBtn").click(function(){r(this).parent().find(this).hide(),r(this).parent().find(".isize").hide(),r(this).parent().find(".icolor").hide(),r(this).parent().find(".size").show().html(r(".isize").val()),r(this).parent().find(".color").show().html(r(".icolor").val()),r(this).parent().find(".edit").show(),r(this).parent().find(".cancel").hide()}),r(".cancel").click(function(){r(this).hide(),r(this).parent().find(".isize").hide(),r(this).parent().find(".icolor").hide(),r(this).parent().find(".size").show(),r(this).parent().find(".color").show(),r(this).parent().find(".edit").show(),r(this).parent().find(".okBtn").hide()})})});