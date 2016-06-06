var pic = {};
pic = {
	init:function(){
		pic.choose();
		pic.add();
	},
	choose:function(){
		$(".choosed").on("click",function(){
			$('nav[data-id="choosed"]').show();
			$('nav[data-id="prodect_list"]').hide();
			$(".off-canvas-wrap").removeClass("move-right");
			$(".rechoose").html("已选照片");
	        $(".clearing-thumbs").find("li").hide();
	        $("input:checked").parent().show();
	      });
        $(".unchoose").on("click",function(){
	      	$('nav[data-id="choosed"]').show();
			$('nav[data-id="prodect_list"]').hide();
			$(".off-canvas-wrap").removeClass("move-right");
			$(".rechoose").html("未选照片");
	        $(".clearing-thumbs").find("li").show();
	        $("input:checked").parent().hide();
	      });
        $(".choose_pic").on("click",function(){
        	$('nav[data-id="choosed"]').hide();
			$('nav[data-id="prodect_list"]').show();
			$(".clearing-thumbs").find("li").show();
			$(".off-canvas-wrap").removeClass("move-right");
        });
        
	},
	add:function(){
		var pic_name = "";
		var native_data = {};
		var local_arry = [];
		var local_ob = {};
		var local_photo_list = [];
		var tip_show = $(".dropdown").find("input").val();

		Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
			this.splice(index, 1);
			}
		};

		$('input[name="pic_id"]').on("click",function(){
			event.stopPropagation();
			var that = this;
			var isinside = false;
			var local_product_id = $(".active").data("productid");
			if($(this).prop("checked")){
				$.each(local_arry,function(i,val){
					if(local_product_id == val.product_id){
						val.photo_list.push($(that).val());
						isinside = true;
					}
				})
				if(isinside){
					return;
				}
				if(tip_show != local_product_id){
					local_photo_list = [];
					local_ob = {};
				}
				local_photo_list.push($(this).val());
				local_ob.product_id = local_product_id;
				local_ob.photo_list = local_photo_list;
				if(tip_show != local_product_id){
					tip_show = local_product_id;
					local_arry.push(local_ob);
				}
				console.log(local_arry)
			}else{
				$.each(local_arry,function(i,val){
					if(val.product_id == local_product_id){
						val.photo_list.remove($(that).val());
					}
				})
				console.log(local_arry)
			}
		});

		$("#drop1>li").on("click",function(){
        	var str = $(this).text();
        	$("#product_type_choose").find("*[data-productid]").removeClass("active");
        	$(this).find("*[data-productid]").addClass("active");
        	$(".dropdown").find("span").html(str);
        	$("input").prop("checked",false);
        	var local_product_id = $(".active").data("productid");
        	$.each(local_arry,function(i,val){
				if(val.product_id == local_product_id){
					$.each(val.photo_list,function(key,item){
						$('input[value="'+item+'"]').prop("checked",true);
					})
				}
			})
        });

	    $(".alert-box").find(".close").on("click",function(){
	    	event.stopPropagation();
	    	$(this).parent().hide();
	    });
      	//点击保存按钮
      	$("#save").on("click",function(){
      		var postdata = [];
      		var product_photo_list = {};
      		var product_id = $(".active").data("productid");
      		var unique_id = $("#unique_id").val();
      		$("input:checked").each(function(){
      			product_photo_list.product_id = product_id;
      			product_photo_list.photo_id = $(this).val();
      			postdata.push(product_photo_list);
      		});
      		postdata = JSON.stringify(postdata);
      		$.ajax({
      			type:"post",
      			url:"/photo/pick",
      			dataType:"json",
      			data:{unique_id:unique_id,product_photo_list:JSON.stringify(local_arry)},
      			success:function(res){
      				if(res.status == 0){
      					$(".alert-box.success").fadeIn();
      				}else if(res.status == 1){
      					$(".alert-box.alert").fadeIn();
      				}
      			},
      			error:function(res){
      				$(".alert-box.alert").fadeIn();
      			}
      		})
      	});
	}
};
pic.init();