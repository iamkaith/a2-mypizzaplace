$(function ready() {
    
        $.getJSON("/api/orders", function (data) {
            data.forEach(function (order) {
                console.log(order);
                let fullAddress = order.address + ", " + order.city + ", " + order.postal;
                let contactInfo = order.phone + ", "  + order.email;

                $('#orders').append(
                    '<tr><th scope="row">' + order.number + '</th>' +
                    '<td>' + order.size + '</td>' +
                    '<td>' + order.crust + '</td>' +
                    '<td>' + order.topping + '</td>'+
                    '<td>' + order.name + '</td>'+
                    '<td>' + fullAddress + '</td>' +
                    '<td>' + order.phone + '</td>' +
                    '<td>' + order.amount + '</td></tr>'  );
            });
        });
    
    });