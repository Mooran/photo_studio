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
		var a=0;
		var tip_show = $(".dropdown").find("input").val();

		Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
			this.splice(index, 1);
			}
		};
		$(document).ready(function(){
			var photo_obj;
			var photo_num = $(".clearing-thumbs").find("li");
			if($(photo_num).length>0){
				$(photo_num).each(function(){
					photo_obj = {};
					photo_obj.imgid = $(this).data("photoid");
					photo_obj.status = 1;
					photo_obj.modify = "";
					local_arry.push(photo_obj);
				})
			}
			console.log(local_arry);
		});

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
        $('select[name="pic_id"]').on("click",function(){
        	var that = this;
        	var old_modify;
        	var imgid = $(that).parent().data("photoid");
        	event.stopPropagation();
        	if(a==1){
        		var status = $(this).val();
        		if(status == 1){

        			$.each(local_arry,function(key,item){
        				if(item.imgid == imgid){
        					item.status = 1;
        					item.modify = '';
        				}
        			})
        			console.log(local_arry)
        		}else{
        			$.each(local_arry,function(key,item){
        				if(item.imgid == imgid){
        					old_modify = item.modify;
        				}
        			})
		        	var d = dialog({
					    title: '请输入需要修改的内容',
					    content: '<textarea type="text" name="modifycontent" id="modifycontent"></textarea>',
					    width:'300px',
					    okValue:'确定',
					    ok:function(){
					    	var modify = $("#modifycontent").val();
					    	if(modify==""||modify==null){
					    		alert("请输入需要修改的内容");
					    	}else{
					    		$.each(local_arry,function(key,item){
			        				if(item.imgid == imgid){
			        					item.status = 2;
			        					item.modify = modify;
			        				}
			        			})
					    	}
					    	console.log(local_arry)
					    },
					    cancelValue:'取消',
					    cancel:function(){}
					});
					d.showModal();
					$("#modifycontent").html(old_modify);
        		}
	            a=0;
	        }
	        else {
	            a=1;
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