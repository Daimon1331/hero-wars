


var modalupdatepassword = new bootstrap.Modal(document.getElementById('modalupdatepassword'), {
    keyboard: false
})

$(document).ready(function() {
    if (window.location.href.indexOf("password/reset") > -1) {
        modalupdatepassword.show()
    }
});

$(".password-button").click(function () {
    var passwordvisible = this.closest('.input-valid').querySelector(".password");
    if ($(passwordvisible).attr('type') == 'password'){
        $($(this.closest('.input-valid')).children(".password-button")).removeClass('view');
        $(this.closest('.input-valid').querySelector(".password-hide")).addClass('view');
        $(passwordvisible).attr('type', 'text');
    } else {
        $($(this.closest('.input-valid')).children(".password-button")).removeClass('view');
        $(this.closest('.input-valid').querySelector(".password-visible")).addClass('view');
        $(passwordvisible).attr('type', 'password');
    }
});

$('#modalregister .close').click(function () {
    var boxesstep = this.closest('.modal').querySelectorAll(".box-step");
    for (var i = 0; i < boxesstep.length; i++) {
        $(boxesstep[i]).removeClass("step-active");
    }
    $(this.closest('.modal').querySelector(".step1")).addClass("step-active");
});

$("#modalregister .green-button").click(function () {
    var form = this.closest('form');
    var boxstepcontrol = this.closest('.box-step')
    var stepcontrol = this.closest('.box-step').querySelector(".entryfield");
    if (stepcontrol.classList.contains('name')) {
            var controlinput = boxstepcontrol.querySelector('.name');
            if (controlinput.value.match(/^[a-z0-9A-Z]{3,30}$/)) {
                $(controlinput).addClass("valid");
                $(controlinput).removeClass("invalid");
                $(boxstepcontrol).removeClass("step-active");
                setTimeout(function () {
                    $(boxstepcontrol.nextElementSibling).addClass("step-active");
                }, 500)
            } else {
                $(controlinput).addClass("invalid");
                $(controlinput).removeClass("valid");
            }
    }
    if (stepcontrol.classList.contains('password')) {
            var controlinput = boxstepcontrol.querySelector('.password');
            if (controlinput.value.match(/^[^\s<>'"]{6,40}$/)) {
                $(controlinput).addClass("valid");
                $(controlinput).removeClass("invalid");
                $(boxstepcontrol).removeClass("step-active");
                setTimeout(function () {
                    $(boxstepcontrol.nextElementSibling).addClass("step-active");
                }, 500)
            } else {
                $(controlinput).addClass("invalid");
                $(controlinput).removeClass("valid");
            }
    }
    if (stepcontrol.classList.contains('mail')) {
            var controlinput = boxstepcontrol.querySelector('.mail');
            if (controlinput.value.match(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/)) {
                $(controlinput).addClass("valid");
                $(controlinput).removeClass("invalid");
                let formData = new FormData(form);
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: '/js/action.php',
                    data: formData,
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        
                    },
                    error: function (data) {

                    }
                });
                return false;
            } else {
                $(controlinput).addClass("invalid");
                $(controlinput).removeClass("valid");
                
            }
    }

});
$("#modallogin .green-button").click(function () {
    var form = this.closest('form')
    var mail = form.querySelector('.mail')
    var password = form.querySelector('.password')
    if (mail.value === "") {
        $(mail).addClass("invalid");
        $(mail).removeClass("valid");
    } else {
        // if (mail.value.match(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/)) {
            $(mail).addClass("valid");
            $(mail).removeClass("invalid");
            // if (password.value === "") {
            //     $(password).addClass("invalid");
            //     $(password).removeClass("valid");
            // } else {
            //     if (password.value.match(/^[^\s<>'"]{6,40}$/)) {
            //         $(password).addClass("valid");
            //         $(password).removeClass("invalid");
                    let formData = new FormData(form);
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: './js/action.php',
                        data: formData,
                        type: 'POST',
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            if (data == '{"errorCode":3001,"message":"User not found"}') {
                                $(mail).addClass("invalid");
                                $(mail).removeClass("valid");
                            } else {

                            }
                            if (data == '{"errorCode":3002,"message":"Incorrect password"}') {
                                $(password).addClass("invalid");
                                $(password).removeClass("valid");
                            } else {

                            }
                        },
                        error: function (data) {
                        }
                    });
                    return false;
            //     } else {
            //         $(password).addClass("invalid");
            //         $(password).removeClass("valid");
            //     }
            // }
        // } else {
        //     $(mail).addClass("invalid");
        //     $(mail).removeClass("valid");
        // }
    }

});

$("#modalreset .green-button").click(function () {
    var form = this.closest('form')
    var mail = form.querySelector('.mail')
    if (mail.value === "") {
        $(mail).addClass("invalid");
        $(mail).removeClass("valid");
    } else {
        let formData = new FormData(form);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/js/action.php',
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,
            success: function (data) {

            },
            error: function (data) {

            }
        });
        return false;
    }
});

$("#modalupdatepassword .green-button").click(function () {
    var form = this.closest('form')
    var passwordnew = form.querySelector('.password-new')
    var passwordconfirm = form.querySelector('.password-confirm')
    if (passwordnew.value === "") {
        $(passwordnew).addClass("invalid");
        $(passwordnew).removeClass("valid");
    } else {
        if (passwordnew.value.match(/^[^\s<>'"]{6,40}$/)) {
            $(passwordnew).addClass("valid");
            $(passwordnew).removeClass("invalid invalid-no-caption");
            if (passwordconfirm.value === passwordnew.value) {
                $(passwordconfirm).addClass("valid");
                let formData = new FormData(form);
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: '/js/action.php',
                    data: formData,
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    success: function (data) {

                    },
                    error: function (data) {

                    }
                });
                return false;
            } else {
                $(passwordnew).addClass("invalid-no-caption");
                $(passwordnew).removeClass("valid");
                $(passwordconfirm).addClass("invalid");
                $(passwordconfirm).removeClass("valid");
            }
        } else {
            $(passwordnew).addClass("invalid");
            $(passwordnew).removeClass("valid");
        }
    }
});

$(".close-modal").click(function () {
    var removeclass = $(".entryfield")
    for (var i = 0; i < removeclass.length; i++) {
        $(removeclass[i]).removeClass("valid invalid");
    }
});


function check() {
    var consent = document.getElementsByClassName('consent');
    for (var i = 0; i < consent.length; i++) {
        var form = consent[i].closest("form");
        if (consent[i].checked)
            form.querySelector("button").disabled = '';

        else form.querySelector("button").disabled = 'disabled';
    }
}