$(document).ready(function() {
    var lettersName = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
    var lettersPhone = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;
    var lettersEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    $('#send_message').click(function (e) {
        e.preventDefault();
        var name = $('#contact-form_name').val();
        var email = $('#contact-form_email').val();
        var message = $('#contact-form_message').val();
        var phone = $('#contact-form_phone').val();
        document.getElementById('contact-form_name').style.borderColor = "#dadada";
        document.getElementById('contact-form_phone').style.borderColor = "#dadada";
        document.getElementById('contact-form_email').style.borderColor = "#dadada";
        document.getElementById('contact-form_message').style.borderColor = "#dadada";
        

        if (name.match(lettersName)) {
            if (phone.match(lettersPhone)) {
                if (phone.length > 0) {
                    document.getElementById('form__note').style.color = '#9ACD32';
                    document.getElementById('form__note').innerHTML = 'Сообщение успешно отправлено. В ближайшее время с Вами свяжется менеджер.';
                    document.getElementById('contact-form_name').value = "";
                    document.getElementById('contact-form_phone').value = "";
                    document.getElementById('contact-form_email').value = "";
                    document.getElementById('contact-form_message').value = "";

                    $.ajax({
                        type: 'POST',
                        url: '/send-message.php',
                        dataType: 'json',
                        data: {
                            name: name,
                            email: email,
                            message: message,
                            phone: phone
                        },
                        success: function (data) {
                            if (data.error === true) {
                                alert("Произошла ошибка");
                            } else {
                                $('#confirmMsg').html(data);
                            }

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {

                        }
                    });
                } else {
                    document.getElementById('form__note').style.color = '#ce3a3a';
                    document.getElementById('form__note').innerHTML = 'Не отправляйте поле сообщения пустым!';
                    document.getElementById('contact-form_message').style.borderColor = "#ce3a3a";
                }
            } else {
                document.getElementById('form__note').style.color = '#ce3a3a';
                document.getElementById('form__note').innerHTML = 'Проверьте корректность телефона!';
                document.getElementById('contact-form_phone').style.borderColor = "#ce3a3a";

            }
        } else {
            document.getElementById('form__note').style.color = '#ce3a3a';
            document.getElementById('form__note').innerHTML = 'Проверьте корректность почты!';
            document.getElementById('contact-form_email').style.borderColor = "#ce3a3a";
        }


        return false;
    });
});
