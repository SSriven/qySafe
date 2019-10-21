$(function () {

    var code = $(".erwei-code");
    var phone = $(".login span");

    phone.hover(function(){
        code.stop().slideToggle("slow");
    })

    //自动轮播
    autoBanner();




    /**
     * 轮播图
     */
    function autoBanner() {
        var listArr = $("#banner_list .list-item");//获取轮播图片列表
        var bannerBox = $(".banner-box");//获取轮播图父盒子
        var bannerJiantou = $(".banner-box .jiantou");//获取箭头
        var bannerPointer = $("#banner_pointer");//获取指示点盒子
        var prevImg = $(".left-jiantou");
        var nextImg = $(".right-jiantou");
        // console.log(document.getElementById("banner_list"),$("#banner_list"),listArr[0])
        //设置背景图
        for(var i = 0; i < listArr.length; i++){
            //设置背景图片
            $(listArr[i].children[0]).css({"background":"url('images/banner" + (i+1) + ".jpg') no-repeat scroll center center","background-size":"cover"});
            $(listArr[i]).css({display:"none"});//把所有图片的透明度设为0
            
            var item = $("<li></li>");//创建指示点
            bannerPointer.append(item);//添加指示点
        }
        // console.log(bannerPointer);
        var pointers = bannerPointer[0].children;
        console.log(pointers);
        $(pointers[0]).addClass("current-pointer");
        $(listArr[0]).css({display:"inline-block"});;//显示第一张
        var curIndex = 0,lastIndex = 0;
        //开始轮播
        var timer = setInterval(autoPlay,4000);

        //监听指示点的点击事件
        for(var k = 0; k < pointers.length; k++){
            (function (index) {
                //鼠标在指示点上悬浮时改变该指示点的样式
                $(pointers[index]).mouseover(function () {
                    clearInterval(timer);
                    $(pointers[lastIndex]).removeClass("current-pointer");//改变上一个被选中样式
                    $(pointers[index]).addClass("current-pointer");//改变当前被选中样式
                    //图片切换
                     //隐藏当前图片
                    $(listArr[lastIndex]).fadeOut("slow");
                    //显示下一张图片
                    $(listArr[index]).fadeIn("slow");
                    lastIndex = index;
                    curIndex = index;
                });
                $(pointers[index]).mouseout(function () {
                    timer = setInterval(autoPlay,4000);
                })
            })(k);
        }

        /**
         * 监听bannerBox鼠标的移入移出事件
         */
        bannerBox.hover(function() {
            bannerJiantou.stop().fadeIn();//箭头淡入
        },function() {
            bannerJiantou.stop().fadeOut();//箭头淡出
        })

        //点击上一张
        prevImg.click(function () {
            curIndex--;
            if(curIndex < 0){
                curIndex = listArr.length-1;
            }
            play();

        })

        //点几下一张图片
        nextImg.click(function () {
            curIndex++;
            if(curIndex >= listArr.length){
                curIndex = 0;
            }
            play();
        })

        /**
         * 自动轮播
         */
        function autoPlay() {
            curIndex++;
            if(curIndex >= listArr.length){
                curIndex = 0;
            }
            play();
        }

        /**
         * 切换图片
         */
        function play() {
            $(pointers[lastIndex]).removeClass("current-pointer");//改变上一个被选中样式
            $(pointers[curIndex]).addClass("current-pointer");//改变当前被选中样式
            //隐藏当前图片
            $(listArr[curIndex]).fadeIn("slow");
            //显示下一张图片
            $(listArr[lastIndex]).fadeOut("slow");
            lastIndex = curIndex;
        }
    }

    function autoSmallBanner(){
        
    }
})