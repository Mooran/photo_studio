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
        $("#drop1>li").on("click",function(){
        	var str = $(this).text();
        	$("#product_type_choose").find("*[data-productid]").removeClass("active");
        	$(this).find("*[data-productid]").addClass("active");
        	$(".dropdown").find("span").html(str);
        });
	},
	add:function(){
		var pic_name = "";
		var native_data = {};
		//弹窗打开之前的操作
		$(".pic_box").on('open.fndtn.reveal', '[data-reveal]', function () {
			var modal = $(this);
			//modal.find("span").html(pic_name);
		});

		$('input[name="pic_id"]').on("click",function(){
			event.stopPropagation();
		})
		//添加图片数量是点击确定，将数据暂存本地
	    $("#sure").on("click",function(){
	    	var nam_list = $(this).parents("#myModal").find("span");
	    	var num_list = $(this).parents("#myModal").find("input");
            for(var i=0;i<nam_list.length;i++){
                nam = $(nam_list[i]).html();
                num = $(num_list[i]).val();
                native_data[nam] = num;
            }
	    	
	    	$(".close-reveal-modal").trigger("click");
	    });
	    //点击添加按钮触发的时间
      	$(".add_pic").on("click",function(){
        	event.stopPropagation();
        	pic_name = $(this).parent().find("span").data("name");
        	if(native_data[pic_name]){
        		$("#pic_number").val(native_data[pic_name]);
        	}else{
        		$("#pic_number").val("0");
        	};
        	$('#myModal').foundation('reveal', 'open');
      	});
      	//点击查看已选
      	$("#choosed").on("click",function(){
      		$(".clearing-thumbs").find("li").hide();
	        $.each(native_data,function(key,item){
	        	if(item != "0"){
	        		$(".clearing-thumbs").find('span[data-name="'+key+'"]').parent().parent().show();
	        	}
	        })
	    });
	    //点击查看未选
      	$("#unchoose").on("click",function(){
      		$(".clearing-thumbs").find("li").show();
	        $.each(native_data,function(key,item){
	        	if(item != "0"){
	        		$(".clearing-thumbs").find('span[data-name="'+key+'"]').parent().parent().hide();
	        	}
	        })
	    });
      	//点击保存按钮
      	$("#save").on("click",function(){
      		var postdata = [];
      		var product_photo_list = {};
      		var product_id = $(".active").data("productid");
      		var unique_id = $("#unique_id").val();
      		console.log(product_id)
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
      			data:{unique_id:unique_id,"product_id":product_id,"product_photo_list":postdata},
      			success:function(res){
      				alert("保存成功")
      			},
      			error:function(res){

      			}
      		})
      	});
      	//点击保存提交的按钮
      	$("#submit").on("click",function(){
      		$(".close-reveal-modal").trigger("click");
      	});
	}
};
pic.init();