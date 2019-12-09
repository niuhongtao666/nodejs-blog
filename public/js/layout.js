$(function () {
    /*动物点击类名处理开始*/
    var li = $('.amimals li');
    if(li.length){
        for (var i = 0; i < li.length; i++)
            li[i].onclick = function () {
                $('.amimalsInner').children().remove();
                console.log($(this).data('id'));
                getAnimalList($(this).data('id'))
                var innerLi=$('.amimalsInner li');
                for (var i = 0; i < li.length; i++) li[i].classList.remove("animalActive");
                this.classList.add("animalActive");
                /*动物显示开始*/
                // alert(innerLi.length);
                // if(innerLi.length){
                //     $('.categoryInner').css('display','block');
                //     $('.noCate').css('display','none');
                // }else{
                //     $('.categoryInner').css('display','none');
                //     $('.noCate').css('display','block');
                // }
                /*动物显示结束*/
            }
    }
    /*动物点击类名处理结束*/
    //动物点击方法封装
    function getAnimalList(id) {
        $.ajax({
            type:'POST',
            url:'/articles/getCate/'+id,
            success:function(data){
                // window.location.href='/';
                console.log(data)
                if(data.data.length){
                    data.data.forEach(function (item) {
                        var imgurl=window.location.origin+item.fileName;
                        var name=item.name;
                        console.log(imgurl)
                        $('.amimalsInner').append(`
                        <li>
                            <img src="${imgurl}">
                            <p>${name}</p>
                        </li> 
                    `);

                    })
                    $('.categoryInner').css('display','block');
                    $('.amimalsInner').css('display','block');
                    $('.noCate').css('display','none');
                }else{
                    $('.categoryInner').css('display','none');
                    $('.amimalsInner').css('display','none');
                    $('.noCate').css('display','block');
                }
            },
            err:function(err){
                if(err) throw err;
            }
        })
    }
})