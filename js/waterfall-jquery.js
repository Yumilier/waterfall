$(window).on('load',function(){
	waterfall();
	var dataInt={'data':[{'src':'21.jpg'},{'src':'22.jpg'},{'src':'23.jpg'},{'src':'24.jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(dataInt.data,function(key, value) {
				var $oPin = $('<div>').addClass('pin').appendTo( $('#main') );
				var $oBox=$('<div>').addClass('box').appendTo($oPin);
				$('<img>').attr('src','images/'+$(value).attr('src')).appendTo($oBox);
			});
			waterfall();
		}
	});
});

function waterfall(){
	var $pins=$('#main>.pin'); //一级子元素
	var w=$pins.eq(0).outerWidth();  //列宽，包括padding和border的宽
	var cols=Math.floor($(window).width()/w);//列数

	$('#main').width(w*cols).css('margin','0 auto');//设置main盒子的宽度，列宽*列数

	var hArr=[];//用于存储每列的高度
	$pins.each(function(index, value) {
		var h=$pins.eq(index).outerHeight();
		if(index<cols){
			hArr[index]=h;//初始值为前cols个图片的高度
		}else{
			var minH=Math.min.apply(null, hArr);//在列高最小值的一列加载下一张图片
			var minHIndex=$.inArray(minH, hArr);
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':w*minHIndex+'px'
			});
			hArr[minHIndex] += $(value).outerHeight();//加载完一张图片后，更新列高
		}
	});
}

//检测是否具备滚动条加载数据块的条件
function checkScrollSlide(){
	var $lastPin=$('#main>div').last();
	//最后一个pin盒子的中央距离顶部的距离
	var lastPinH=$lastPin.offset().top+Math.floor($lastPin.outerHeight()/2);
	//滚动的距离
	var scrollTop=$(window).scrollTop();
	//窗口可视区域的高度
	var documentH=$(window).height();
	return (lastPinH<scrollTop+documentH)?true:false;	
}