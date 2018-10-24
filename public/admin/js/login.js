
$(function () {

  $('form').bootstrapValidator({

    //图标提示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },
    //用户名验证
    fields: {
      username: {
        validators: {
          notEmpty: {
            //验证用户名是否为空
            message: '用户名不能为空'
          },
          //验证账号长度
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6位之间'
          },
          callback: {
            message: '用户名不存在'
          }
          
        }
      },
      password: {
        validators: {
          notEmpty: {
            //验证用户名是否为空
            message: '密码不能为空'
          },
          //验证账号长度
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12位之间'
          },
          callback: {
            message :'密码错误'
          }

        }
      }
    }

  })


  //使用ajax提交表单
  $('form').on('success.form.bv', function (e) {
    //阻止表单的默认提交行为
    e.preventDefault();

    //使用ajax提交表单
    $.ajax({
      url: '/employee/employeeLogin',
      type: 'post',
      data: $('form').serialize(),
      success: function (info) {
        // console.log(info);
        //当账号错误
        if(info.error === 1000){

          // alert('用户名不存在');
          $('form')
          .data('bootstrapValidator')
          .updateStatus('username', 'INVALID', 'callback')

        }

        //密码错误
        if(info.error === 1001){
          // alert('密码错误');
          $('form')
          .data('bootstrapValidator')
          .updateStatus('password', 'INVALID', 'callback')
        }

        if(info.success){
          location.href = "index.html";
        }

      }
    })
  })


  //重置表单提交
  $(".btnReset").on('click',function(){
     $('form')
     .data('bootstrapValidator')
     .resetForm(true);
  })


})