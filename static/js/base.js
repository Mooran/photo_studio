var pic = {};
pic = {
	init:function(){
		pic.add();
	},
	add:function(){
		var pic_name = "";
		var check_status;
		var history_data = $("#history_data").val();
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
		$(document).ready(function(){
			var pick_obj,picked_photo;
			if($(".picked_photos").length>0){
				$(".picked_photos").each(function(){
					pick_obj = {};
					picked_photo = [];
					$(this).find("span").each(function(){
						picked_photo.push($(this).data("photolist").toString());
					})
					pick_obj.product_id = $(this).data("productid");
					pick_obj.photo_list = picked_photo;
					local_arry.push(pick_obj);
				})
			}
			$("#drop1").find("li:first").trigger("click");
			console.log(local_arry);
		})
		// $(document).ready(function(){
		// 	$('input[data-productid]').each(function(){
		// 		var that = this;
		// 		var el_obj,el_photo;
		// 		var isinside = false;
		// 		var product_id = $(that).data("productid");
		// 		if(local_arry.length == 0){
		// 			el_obj = {};
		// 			el_photo = [];
		// 			el_obj.product_id = product_id;
		// 			el_photo.push($(that).val());
		// 			el_obj.photo_list = el_photo;
		// 			local_arry.push(el_obj);
		// 			isinside = true;
		// 		}else{
		// 			$.each(local_arry,function(i,val){
		// 				if(product_id == val.product_id){
		// 					val.photo_list.push($(that).val());
		// 					isinside = true;
		// 				}
		// 			})
		// 		}
		// 		console.log(isinside)
		// 		if(isinside){
		// 			return;
		// 		}else{
		// 			el_obj = {};
		// 			el_photo = [];
		// 			el_obj.product_id = product_id;
		// 			el_photo.push($(that).val());
		// 			el_obj.photo_list = el_photo;
		// 			local_arry.push(el_obj);
		// 		}
		// 		console.log(local_arry)
		// 	})
		// 	$("#drop1").find("li:first").trigger("click");
		// });
		//查看已选
		$(".choosed").on("click",function(){
			$('nav[data-id="choosed"]').show();
			$('nav[data-id="prodect_list"]').hide();
			$(".off-canvas-wrap").removeClass("move-right");
			$(".rechoose").html("已选照片");
	        $(".clearing-thumbs").find("li").hide();
	        $("#second_protype_choose").find("*[data-productid]").removeClass("active");
	        $("#second_protype_choose").find(".dropdown").find("span").html("全部已选")
	        $.each(local_arry,function(i,val){
				$.each(val.photo_list,function(key,item){
					$(".clearing-thumbs").find('input[value="'+item+'"]').parent().show();
					$(".clearing-thumbs").find('input[value="'+item+'"]').prop("checked",true);
				})
			});
			check_status = "choosed";
	    });
	    //查看未选
		$(".unchoose").on("click",function(){
	      	$('nav[data-id="choosed"]').show();
			$('nav[data-id="prodect_list"]').hide();
			$(".off-canvas-wrap").removeClass("move-right");
			$(".rechoose").html("未选照片");
	        $(".clearing-thumbs").find("li").show();
	        $("#second_protype_choose").find("*[data-productid]").removeClass("active");
	        $("#second_protype_choose").find(".dropdown").find("span").html("全部未选")
	        $.each(local_arry,function(i,val){
				$.each(val.photo_list,function(key,item){
					$(".clearing-thumbs").find('input[value="'+item+'"]').parent().hide();
					$(".clearing-thumbs").find('input[value="'+item+'"]').prop("checked",false);
				})
			});
			check_status = "unchoose";
        });

        $('a[data-productid="all"]').on("click",function(){
        	event.stopPropagation();
        	if(check_status == "choosed"){
        		$(".choosed").trigger("click");
        	}else if(check_status == "unchoose"){
        		$(".unchoose").trigger("click");
        	}
        });
        $(".clearing-thumbs").find("li").on("click",function(){
        	$(this).find("input").trigger("click");
        });
		//在线选片
        $(".choose_pic").on("click",function(){
        	var local_product_id = $(".active").data("productid");
        	$('nav[data-id="choosed"]').hide();
			$('nav[data-id="prodect_list"]').show();
			$(".clearing-thumbs").find("li").show();
			$(".clearing-thumbs").find("input").prop("checked",false);
			$(".off-canvas-wrap").removeClass("move-right");
			$.each(local_arry,function(i,val){
				if(local_product_id == val.product_id){
					$.each(val.photo_list,function(key,item){
						$('input[value="'+item+'"]').prop("checked",true);
					})
				}
			})
        });

        $(".pic_box").on("click",function(){
            if($(".off-canvas-wrap").hasClass("move-right")){
                $(".off-canvas-wrap").removeClass("move-right");  
                event.stopPropagation();
                event.preventDefault();    
            }
        });


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
        	$(this).parent().parent().find(".dropdown").find("span").html(str);
        	$("input").prop("checked",false);
        	var local_product_id = $("#product_type_choose").find(".active").data("productid");
        	$.each(local_arry,function(i,val){
				if(val.product_id == local_product_id){
					$.each(val.photo_list,function(key,item){
						$('input[value="'+item+'"]').prop("checked",true);
					})
				}
			})
        });

        $("#drop2>li").on("click",function(){
        	var str = $(this).text();
        	$("#second_protype_choose").find("*[data-productid]").removeClass("active");
        	$(this).find("*[data-productid]").addClass("active");
        	$(this).parent().parent().find(".dropdown").find("span").html(str);
        	$("input").prop("checked",false);
        	var local_product_id = $("#second_protype_choose").find(".active").data("productid");
        	if(check_status == "choosed"){
        		$('input[type="checkbox"]').parent().hide();
	        	$.each(local_arry,function(i,val){
					if(val.product_id == local_product_id){
						$.each(val.photo_list,function(key,item){
							$('input[value="'+item+'"]').prop("checked",true);
							$(".pic_box").find('input[value="'+item+'"]').parent().show();
						})
					}
				})
        	}else if(check_status == "unchoose"){
        		$('input[type="checkbox"]').parent().show();
	        	$.each(local_arry,function(i,val){
					if(val.product_id == local_product_id){
						$.each(val.photo_list,function(key,item){
							$('input[value="'+item+'"]').prop("checked",true);
							$(".pic_box").find('input[value="'+item+'"]').parent().hide();
						})
					}
				})
        	}
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