$(function () {
    $('#filesCategory').on('change',function(){
        // alert(1)
        var file = document.getElementById("filesCategory")
        //因为准备用post提交，又因为图片的内容比较大，所以我们选择使用formdata来承载数据
        //创建formdata对象
        var formData = new FormData();
        //给formdata对象中放入数据(键值对的方式)
        // alert(file.files[0])
        // alert('图片'+file.files[0])
        // console.dir(file.files)
        // var avatarList=file.files;
        // for(let i = 0;i<avatarList.length;i++){
        formData.append('file', file.files[0]);
        // }

        // formData.append('file',file.files[0]);
        $.ajax({
            url: '/articles/uploadCategory',//请求路径
            type: 'POST',
            data: formData,
            contentType: false,//为了让浏览器根据传入的formdata来判断contentType
            processData: false,//同上
            success: function(data){
                console.log(data)
                // alert(data.data)
                if(200 === data.code) {
                    $('#fileName').val(data.data);
                    var img=window.location.origin+data.data;
                    $('.categoryPicShow').css('display','block');
                    $('.categoryPic').attr('src',img);
                } else {
                }
                console.log(2)
            },
            error: function(){
                // $("#result").html("与服务器通信发生错误");
            }
        });
    });
    $('.deleteImg').on('click',function () {
        $('.categoryPicShow').css('display','none');
        $('#fileName').val('');
        $('#filesCategory').val('');
        $('.categoryPic').attr('src','');
    })

})