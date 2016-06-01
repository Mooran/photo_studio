var pic = {};
pic = {
	init:function(){
		// pic.choose();
		pic.add();
	},
	choose:function(){
		$("#choosed").on("click",function(){
	        $(".clearing-thumbs").find("li").hide();
	        $("input:checked").parent().show();
	      });
	      $("#unchoose").on("click",function(){
	        $(".clearing-thumbs").find("li").show();
	        $("input:checked").parent().hide();
	      });
	      $("#allchoose").on("click",function(){
	        $(".clearing-thumbs").find("li").show();
	        $(".clearing-thumbs li").find("input").prop("checked",true);
	      });
	      $("#inverse").on("click",function(){
	        $(".clearing-thumbs li").find("input").each(function(){
	          var checked = $(this).prop("checked");
	          if(checked){
	            $(this).prop("checked",false);
	          }else{
	            $(this).prop("checked",true);
	          }
	        })
	      });
	},
	add:function(){
		var pic_name = "";
		var native_data = {};
		//弹窗打开之前的操作
		$(".pic_box").on('open.fndtn.reveal', '[data-reveal]', function () {
			var modal = $(this);
			modal.find("#choose_pic_name").html(pic_name);
		});
		//添加图片数量是点击确定，将数据暂存本地
	    $("#sure").on("click",function(){
	    	var nam = $(this).parents("#myModal").find("#choose_pic_name").html();
	    	var num = $(this).parents("#myModal").find("#pic_number").val();
	    	native_data[nam] = num;
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
      		$("#total_pic").html('');
      		var str;
           $.each(native_data,function(key,item){
           	str = '<div class="row">'+
	                '<div class="columns small-6 medium-7"><span>'+key+'</span></div>'+
	                '<div class="columns small-6 medium-2"><span class="right">'+item+'张</span>'+
	              '</div>';
          	$("#total_pic").append(str);
           });
           $('#saveModal').foundation('reveal', 'open');
      	});
      	//点击保存提交的按钮
      	$("#submit").on("click",function(){
      		$(".close-reveal-modal").trigger("click");
      	});
	}
};
pic.init();