$(function ready() {
    $("#submitForm").submit(function (event) {
        event.preventDefault();

        console.log("i'm processing the form");

        var newOrder = JSON.stringify({
            size: $('.size:checked').val(),
            crust: $('.crust:checked').val(),
            topping: $('.topping:checked').map(function() { 
                return this.value + " ";
            }).get(),
            name: $('#firstName').val() + " " + $('#lastName').val(),
            address: $('#address1').val(),
            city: $('#city').val(),
            postal: $('#postal').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            amount: 0 // just initial value
        });

        $.ajax({
            url: '/api/order',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: newOrder,
            success: function (json, status, request) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-success');
                $('#statusMsg').html('Success! Your order has saved!');
            },

            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Sorry! There was a problem with your pizza order. Please check your order form again!');
            }
        });

    });
});