var pic = {};
pic = {
	init:function(){
		pic.add();
	},
	add:function(){
		var pic_name = "";
		var check_status;
		var old_status;
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
					photo_obj.name = $(this).data("photoname");
					photo_obj.imgid = $(this).data("photoid");
					photo_obj.status = $(this).data("selectval");
					photo_obj.modify = $(this).data("modify");
					local_arry.push(photo_obj);
					$(this).find("select").val(photo_obj.status);
				})
			}
			console.log(local_arry);
		});

		//查看已确认
		$(".choosed").on("click",function(){
			$(".clearing-thumbs").find("li").hide();
			$(".clearing-thumbs").find("select").each(function(){
				if($(this).val()=="1"){
					$(this).parent().show();
				}
			});
			// $('nav[data-id="choosed"]').show();
			// $('nav[data-id="prodect_list"]').hide();
			$(".off-canvas-wrap").removeClass("move-right");
			// $(".rechoose").html("已选照片");
	  //       $(".clearing-thumbs").find("li").hide();
	        // $("#second_protype_choose").find("*[data-productid]").removeClass("active");
	  //       $("#second_protype_choose").find(".dropdown").find("span").html("全部已选")
	  //       $.each(local_arry,function(i,val){
			// 	$.each(val.photo_list,function(key,item){
			// 		$(".clearing-thumbs").find('input[value="'+item+'"]').parent().show();
			// 		$(".clearing-thumbs").find('input[value="'+item+'"]').prop("checked",true);
			// 	})
			// });
			// check_status = "choosed";
	    });

	    //查看待修改
		$(".unchoose").on("click",function(){
			$(".clearing-thumbs").find("li").show();
			$(".clearing-thumbs").find("select").each(function(){
				if($(this).val()=="1"){
					$(this).parent().hide();
				}
			});
	  //     	$('nav[data-id="choosed"]').show();
			// $('nav[data-id="prodect_list"]').hide();
			$(".off-canvas-wrap").removeClass("move-right");
			// $(".rechoose").html("未选照片");
	  //       $(".clearing-thumbs").find("li").show();
	  //       $("#second_protype_choose").find("*[data-productid]").removeClass("active");
	  //       $("#second_protype_choose").find(".dropdown").find("span").html("全部未选")
	  //       $.each(local_arry,function(i,val){
			// 	$.each(val.photo_list,function(key,item){
			// 		$(".clearing-thumbs").find('input[value="'+item+'"]').parent().hide();
			// 		$(".clearing-thumbs").find('input[value="'+item+'"]').prop("checked",false);
			// 	})
			// });
			// check_status = "unchoose";
        });

        // $('a[data-productid="all"]').on("click",function(){
        // 	event.stopPropagation();
        // 	if(check_status == "choosed"){
        // 		$(".choosed").trigger("click");
        // 	}else if(check_status == "unchoose"){
        // 		$(".unchoose").trigger("click");
        // 	}
        // });
		//查看全部
        $(".choose_pic").on("click",function(){
        	$(".clearing-thumbs").find("li").show();
   //      	var local_product_id = $(".active").data("productid");
   //      	$('nav[data-id="choosed"]').hide();
			// $('nav[data-id="prodect_list"]').show();
			// $(".clearing-thumbs").find("li").show();
			// $(".clearing-thumbs").find("input").prop("checked",false);
			$(".off-canvas-wrap").removeClass("move-right");
			// $.each(local_arry,function(i,val){
			// 	if(local_product_id == val.product_id){
			// 		$.each(val.photo_list,function(key,item){
			// 			$('input[value="'+item+'"]').prop("checked",true);
			// 		})
			// 	}
			// })
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
					    title: $(that).data("name"),
					    content: '<textarea type="text" name="modifycontent" id="modifycontent" placeholder="请输入修改要求"></textarea>',
					    width:'300px',
					    okValue:'确定',
					    ok:function(){
					    	var modify = $("#modifycontent").val();
					    	if(modify==""||modify==null){
					    		new tip({
		                            type: 'error',
		                            text: '请输入需要修改的内容'
		                        }).show();
		                        return false;
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
					    cancel:function(){
					    	d.close().remove();
					    	$(that).val(old_status);
					    }
					});
					d.showModal();
					$("#modifycontent").html(old_modify);
        		}
	            a=0;
	        }
	        else {
	            a=1;
	            console.log("aaa")
	            old_status = $(that).val();
	        }
        });

		// $("#drop1>li").on("click",function(){
  //       	var str = $(this).text();
  //       	$("#product_type_choose").find("*[data-productid]").removeClass("active");
  //       	$(this).find("*[data-productid]").addClass("active");
  //       	$(this).parent().parent().find(".dropdown").find("span").html(str);
  //       	$("input").prop("checked",false);
  //       	var local_product_id = $("#product_type_choose").find(".active").data("productid");
  //       	$.each(local_arry,function(i,val){
		// 		if(val.product_id == local_product_id){
		// 			$.each(val.photo_list,function(key,item){
		// 				$('input[value="'+item+'"]').prop("checked",true);
		// 			})
		// 		}
		// 	})
  //       });

    //     $("#drop2>li").on("click",function(){
    //     	var str = $(this).text();
    //     	$("#second_protype_choose").find("*[data-productid]").removeClass("active");
    //     	$(this).find("*[data-productid]").addClass("active");
    //     	$(this).parent().parent().find(".dropdown").find("span").html(str);
    //     	$("input").prop("checked",false);
    //     	var local_product_id = $("#second_protype_choose").find(".active").data("productid");
    //     	if(check_status == "choosed"){
    //     		$('input[type="checkbox"]').parent().hide();
	   //      	$.each(local_arry,function(i,val){
				// 	if(val.product_id == local_product_id){
				// 		$.each(val.photo_list,function(key,item){
				// 			$('input[value="'+item+'"]').prop("checked",true);
				// 			$(".pic_box").find('input[value="'+item+'"]').parent().show();
				// 		})
				// 	}
				// })
    //     	}else if(check_status == "unchoose"){
    //     		$('input[type="checkbox"]').parent().show();
	   //      	$.each(local_arry,function(i,val){
				// 	if(val.product_id == local_product_id){
				// 		$.each(val.photo_list,function(key,item){
				// 			$('input[value="'+item+'"]').prop("checked",true);
				// 			$(".pic_box").find('input[value="'+item+'"]').parent().hide();
				// 		})
				// 	}
				// })
    //     	}
    //     });

	    $(".alert-box").find(".close").on("click",function(){
	    	event.stopPropagation();
	    	$(this).parent().hide();
	    });
      	//点击保存按钮
      	$("#save").on("click",function(){
      		var str = '';
      		var unique_id = $("#unique_id").val();
      		$.each(local_arry,function(key,item){
      			if(item.status == 2&&item.modify!=''){
      				str = str + '<div class="row"><div class="columns small-4">'+item.name+'</div><div class="columns small-8" style="word-wrap: break-word;">'+item.modify+'</div></div>';
      			}
      		});
      		var d = dialog({
			    title: "待修改图片列表",
			    content: str,
			    width:'300px',
			    okValue:'确定',
			    ok:function(){
			    	dialog({
					    title: "请输入本次在线选样的总体要求",
					    content: '<textarea type="text" name="lastrequire" id="lastrequire" placeholder="请输入本次在线选样的总体要求"></textarea>',
					    width:'300px',
					    okValue:'确定',
					    ok:function(){
					    	var lastrequire = $("#lastrequire").val();
					    	$.ajax({
				      			type:"post",
				      			url:"/sample/pick",
				      			dataType:"json",
				      			data:{unique_id:unique_id,photo_list:JSON.stringify(local_arry),lastrequire:lastrequire},
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
				      		});
				      		d.close().remove();
					    },
					    cancelValue:'取消',
					    cancel:function(){
					    	d.close().remove();
					    }
					}).show();
			    },
			    cancelValue:'取消',
			    cancel:function(){
			    	d.close().remove();
			    }
			});
			d.showModal();
      	});
	}
};
pic.init();