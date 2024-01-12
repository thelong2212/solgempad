// JS for a component that can be used multiple times
$('body').on('click', '.js-showValue', function () {
    alert($(this).closest('.form-group').find('input').val());
});

// JS for a component that is intended to be used once only
$('body').on('click', '#changeColor', function () {
    $(this).closest('div').find('span').css('background', getRandomColor())
});

// A Function
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(document).ready(function () {
    $('.your-class').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });
});

var eventHandled = false;

function handleEvent() {
    if (!eventHandled) {
        // Kiểm tra nếu count đã được lưu trong localStorage

        if (localStorage.getItem('count')) {
            // Đọc giá trị hiện tại của biến count từ localStorage
            var count = parseFloat(localStorage.getItem('count'));
        } else {
            // Nếu count chưa tồn tại, gán giá trị ban đầu là 0
            var count = 125;
        }

        // Tăng giá trị count lên 0.5
        count = count + 0.5;
        // Lưu giá trị mới của count vào localStorage
        localStorage.setItem('count', count.toString())

        // Đánh dấu đã thực hiện cộng vào count
        localStorage.setItem('hasAdded', true);
        // Lưu giá trị mới của count vào localStorage
        localStorage.setItem('count', count);

        // Hiển thị giá trị count trên trang web
        document.getElementById('countSol').textContent = count;
        eventHandled = true;
    }
}

window.onload = function () {
    handleEvent();
};