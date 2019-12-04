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
        console.dir(file.files)
        var avatarList=file.files;
        for(let i = 0;i<avatarList.length;i++){
            formData.append('file', avatarList[i]);
        }

        // formData.append('file',file.files[0]);
        $.ajax({
            url: '/articles/upload',//请求路径
            type: 'POST',
            data: formData,
            contentType: false,//为了让浏览器根据传入的formdata来判断contentType
            processData: false,//同上
            success: function(data){
                console.log(data)
                // alert(data.data)
                if(200 === data.code) {
                    var images=data.data;
                    if(images.length){
                        if(images[0]){
                            $('.imgArticle0').css('display','block');
                            var img=window.location.origin+images[0]['pathNew'];
                            $('#fileName').val(images[0]['pathNew'])
                            $('#each').attr('src',img);
                        }
                        if(images[1]){
                            $('.imgArticle1').css('display','block');
                            var img=window.location.origin+images[1]['pathNew'];
                            $('#fileName1').val(images[1]['pathNew'])
                            $('#each1').attr('src',img);
                        }
                        if(images[2]){
                            $('.imgArticle2').css('display','block');
                            var img=window.location.origin+images[2]['pathNew'];
                            $('#fileName2').val(images[2]['pathNew'])
                            $('#each2').attr('src',img);
                        }
                        if(images[3]){
                            $('.imgArticle3').css('display','block');
                            var img=window.location.origin+images[3]['pathNew'];
                            $('#fileName3').val(images[3]['pathNew'])
                            $('#each3').attr('src',img);
                        }
                        if(images[4]){
                            $('.imgArticle4').css('display','block');
                            var img=window.location.origin+images[4]['pathNew'];
                            $('#fileName4').val(images[4]['pathNew'])
                            $('#each4').attr('src',img);
                        }
                        if(images[5]){
                            $('.imgArticle5').css('display','block');
                            var img=window.location.origin+images[5]['pathNew'];
                            $('#fileName5').val(images[5]['pathNew'])
                            $('#each5').attr('src',img);
                        }
                        if(images[6]){
                            $('.imgArticle6').css('display','block');
                            var img=window.location.origin+images[6]['pathNew'];
                            $('#fileName6').val(images[6]['pathNew'])
                            $('#each6').attr('src',img);
                        }
                        if(images[7]){
                            $('.imgArticle7').css('display','block');
                            var img=window.location.origin+images[7]['pathNew'];
                            $('#fileName7').val(images[7]['pathNew'])
                            $('#each7').attr('src',img);
                        }
                    }
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