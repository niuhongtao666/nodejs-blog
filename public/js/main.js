$(function(){
    $('.delete-article').on('click',function(e){
        console.log($(this).data('id'));
        $.ajax({
            type:'DELETE',
            url:'/articles/delete/'+$(this).data('id'),
            success:function(){
                window.location.href='/';
            },
            err:function(err){
                if(err) throw err;
            }
        })
    });
    $('#files').on('change',function(){
        // alert(1)
        var file = document.getElementById("files")
        //因为准备用post提交，又因为图片的内容比较大，所以我们选择使用formdata来承载数据
        //创建formdata对象
        var formData = new FormData();
        //给formdata对象中放入数据(键值对的方式)
        // alert(file.files[0])
        // alert('图片'+file.files[0])
        formData.append('file',file.files[0]);
        $.ajax({
            url: '/articles/upload',//请求路径
            type: 'POST',
            data: formData,
            contentType: false,//为了让浏览器根据传入的formdata来判断contentType
            processData: false,//同上
            success: function(data){
                // alert(data.data)
                if(200 === data.code) {
                    // console.log(window.location)
                    var img=window.location.origin+data.data;
                    // $('#result').html("上传成功！");
                    $('.imgArticle').css('display','block');
                    $('#fileName').val(img)
                    $('#each').attr('src',img);
                } else {
                    // $('#result').html("上传失败！");
                }
                console.log(2)
            },
            error: function(){
                // $("#result").html("与服务器通信发生错误");
            }
        });
    });
    $('.deleteImg').on('click',function () {
        $('.imgArticle').css('display','none');
        $('#fileName').val('');
        $('#files').val('');
        $('#each').attr('src','');
    })
    $('#filesEdit').on('change',function(){
        // alert(1)
        console.log($(this).data('id'));
        var file = document.getElementById("filesEdit")
        //因为准备用post提交，又因为图片的内容比较大，所以我们选择使用formdata来承载数据
        //创建formdata对象
        var formData = new FormData();
        //给formdata对象中放入数据(键值对的方式)
        // alert(file.files[0])
        // alert('图片'+file.files[0])
        formData.append('file',file.files[0]);
        $.ajax({
            url: '/articles/uploadEdit/'+$(this).data('id'),//请求路径
            type: 'POST',
            data: formData,
            contentType: false,//为了让浏览器根据传入的formdata来判断contentType
            processData: false,//同上
            success: function(data){
                // alert(data.data)
                if(200 === data.code) {
                    // console.log(window.location)
                    var img=window.location.origin+data.data;
                    alert(img)
                    // $('#result').html("上传成功！");
                    $('.imgArticleEdit').css('display','block');
                    $('#fileNameEdit').val(img)
                    // $('#eachEdit').attr('src',img);
                    window.location.reload();
                } else {
                    // $('#result').html("上传失败！");
                }
                console.log(2)
            },
            error: function(){
                // $("#result").html("与服务器通信发生错误");
            }
        });
    });
    $('.deleteImgEdit').on('click',function () {
        $('.imgArticleEdit').css('display','none');
        $('#fileNameEdit').val('');
        $('#filesEdit').val('');
        $('#eachEdit').attr('src','');
    })
    $('#myButton').on('click',function () {
        var comment=$('#textareaChange').val();
        var id=$('#articleId').val();
        // alert(comment);
        // alert(id)
       $.ajax({
            url: '/articles/comment/'+id,//请求路径
            type: 'POST',
            data: {comment:comment},
            success: function(data){
                // alert(data.code)
                // alert(data.data)
                if(200 === data.code) {
                    window.location.reload();
                } else {
                    // $('#result').html("上传失败！");
                }
                // console.log(2)
            },
            error: function(){
                // $("#result").html("与服务器通信发生错误");
            }
        });
    })
});