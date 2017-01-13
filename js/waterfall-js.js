window.onload=function(){

	waterfall("main","pin");

	var dataInt={"data":[{"src":"21.jpg"},{"src":"22.jpg"},{"src":"23.jpg"},{"src":"24.jpg"}]};

	window.onscroll=function(){
		if(checkScrollSlide()){
			var oParent=document.getElementById("main");
			//将数据块渲染到页面的尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oPin=document.createElement("div");
				oPin.className="pin";
				oParent.appendChild(oPin);
				var oBox=document.createElement("div");
				oBox.className="box";
				oPin.appendChild(oBox);
				var oImg=document.createElement("img");
				oImg.src="./images/"+dataInt.data[i].src;
				oBox.appendChild(oImg);
			}
			waterfall("main","pin");
		}
	}
}

function waterfall(parent,pin){
	//将main下所有class为pin的元素取出来
	var oParent=document.getElementById(parent);
	var oPins=getByClass(oParent,pin);
	//计算整个页面显示的列数
	var oPinW=oPins[0].offsetWidth; //每个pin盒子的宽度，包括padding不包括margin
	var cols=Math.floor(document.documentElement.clientWidth/oPinW);//列数
	//设置main的宽
	oParent.style.cssText="width:"+oPinW*cols+"px;margin:0 auto";
	var hArr=[];//用于存放每一列图片的总高度，初始值为前六张图片的高度
	for(var i=0;i<oPins.length;i++){
		if(i<cols){
			hArr.push(oPins[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);//列高的最小值
			var index=getMinhIndex(hArr,minH);//最小值的索引
			oPins[i].style.position="absolute";
			oPins[i].style.top=minH+"px";
			//设置left方法1
			oPins[i].style.left=oPinW*index+"px";
			//方法2
			//oPins[i].style.left=oPins[index].offsetLeft+"px";
			hArr[index]+=oPins[i].offsetHeight;//更新列高
		}
	}
}

//根据class获取元素
function getByClass(parent,clsName){
	var elements=parent.getElementsByTagName("*");//获取所有子元素
	var pinArr=new Array();//用于存储最终取出的结果
	for(var i=0;i<elements.length;i++){
		if(elements[i].className==clsName){
			pinArr.push(elements[i]);
		}
	}
	return pinArr;
}

//获取数组中最小值的索引
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//检测是否具备滚动条加载数据块的条件
function checkScrollSlide(){
    var oParent=document.getElementById("main");
    var oPins=getByClass(oParent,"pin");
    //最后一个盒子的中央距离顶部的距离
    var lastPinH=oPins[oPins.length-1].offsetTop+Math.floor(oPins[oPins.length-1].offsetHeight/2);
    //滚动的距离
    var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
    //窗口可视区域的高度
    var height=document.body.clientHeight || document.documentElement.clientHeight;
    return (lastPinH<scrollTop+height)?true:false;
}