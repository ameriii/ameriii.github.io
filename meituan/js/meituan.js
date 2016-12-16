/**
 * Created by Administrator on 2016/12/13 0013.
 */


$(function(){

    var swiper = new Swiper('.swiper-container', {
        pagination : '.swiper-pagination',
        paginationClickable : true
    });


    //    监听滚动事件
    $(window).scroll(function(){
        console.log($(window).scrollTop());
        var scrollTop = $(window).scrollTop();
        if(scrollTop >= 500){
            $('.top-btn').css('display', 'flex');
        } else {
            $('.top-btn').css('display', 'none');
        }
    })

    //点击回到顶部
    $(document).on('click', '.top-btn', function(){
        $(window).scrollTop(0);
    })

    //items1
    $('.items1').click(function(){
        location.href = 'goodsList.html'
    })
    $('.items2').click(function(){
        location.href = 'movie.html'
    })

    //    回到首页
    $('.footer-nav').click(function(){
        location.href = 'meituan.html';
    })
})


//goodslist专用
$(function(){
    $('.nav-left').not('.nogo').click(function(e){
        if(history.length <= 1){
            location.href = 'meituan.html'
        }
        history.go(-1);
        e.preventDefault();
    })
    //进入商品详情
    $('.list1 dd').eq(0).click(function(){
        location.href = 'details.html'

    })

    //
    var temp = [0, 0, 0, 0];
    $('.nav li').click(function(){
        var offsetTop = $(this).offset().top;
        // $(document).scrollTop(offsetTop - 2);
        var index = $(this).index();
        if(temp[index] == 1){
            $(this).css('color', '#666').find('i')
                .css({
                    'border-top-color' : '#B7B7B7',
                    'transform-origin' : 'center 25%',
                    'transform' : 'rotate(0)'
                })
            temp = [0, 0, 0, 0];
            //在这里收起下拉列表
            // $('.dropdown_scroller>ul >li').eq(index).css('display','block').end().eq(index).siblings('li').css('display','none');
            // $('.dropdown_sub_scroller>ul> li').eq(index).css('display','block').end().eq(index).siblings('li').css('display','none');

            $('.dropdown_scroller').slideUp();
            $('.dropdown_sub_scroller').slideToggle();
            $('.shade').slideToggle(100);

            return;
        }
        temp = [0, 0, 0, 0];
        temp[index] = 1;
        console.log(temp);

        $(this).css('color', '#06c1ae').find('i').css({
            'border-top-color' : '#06c1ae',
            'transform-origin' : 'center 25%',
            'transform' : 'rotate(180deg)'
        }).end().siblings('li').css('color', '#666').find('i')
            .css({
                'border-top-color' : '#B7B7B7',
                'transform-origin' : 'center 25%',
                'transform' : 'rotate(0)'
            })
        console.log(index);

        //在这里切换对应列表
        if(index == 0){
            $('.dropdown_scroller>ul >li').eq(index).css('display','block');
            $('.dropdown_scroller').css('display','block');

        }else {
            $('.dropdown_scroller').css('display','none');
            // $('.dropdown_scroller').slideDown();

        }
        $('.dropdown_sub_scroller>ul> li').eq(index).css('display','block').end().eq(index).siblings('li').css('display','none');
        $('.dropdown_sub_scroller').slideDown();
        $('.shade').slideDown(100);




    })

    $('.shade').click(function(){
        $('.dropdown_scroller').slideUp();
        $('.dropdown_sub_scroller').slideToggle();
        $('.shade').slideToggle(100);

        $('.nav-bar .nav li').css('color', '#666').find('i')
            .css({
                'border-top-color' : '#B7B7B7',
                'transform-origin' : 'center 25%',
                'transform' : 'rotate(0)'
            })

        temp = [0, 0, 0, 0];

    })


    $('.ccenter').on('click','span',function(){
        $(this).css({
            color:'white',
        background:'rgb(102, 102, 102)'
        }).siblings().css({
            color:'black',
            background:'white'
        })
        if($(this).index()==1){
            $(this).parent().next().css({
                'text-align': 'right'
            })

        }else {
            $(this).parent().next().css({
                'text-align': 'left'
            })
        }
    })


})

//点击加载更多
$(function(){
    $('.more span').click(function(){
       $.getJSON('data/meituan_1.json',function(data){
           var moredata = data;
           // console.log(moredata);

            $.each(moredata,function(index){
                var cloneitem = $('.copyitem').eq(0).clone(true);
                cloneitem.find('img').attr('src',moredata[index].lPic);
                cloneitem.find('.title').text(moredata[index].title);
                cloneitem.find('.deal').text(moredata[index].deal);
                cloneitem.find('strong').text(moredata[index].strong);
                cloneitem.find('.price span').eq(0).text(moredata[index].oldprice);
                cloneitem.find('.price span').eq(1).text(moredata[index].num);


                cloneitem.insertBefore($('.more'));
            })
       });
    })
})