

function showPopup() {
    document.getElementById('p2xpopup').style.display = 'block';
}

function optionSelected(option) {
    if (option === 'not yet') {
        document.getElementById('p2xpopup').style.display = 'none';
    } else if (option === 'yes') {
        // Redirect to another HTML page
        window.location.href = '../blank.html';
    }
}


function increaseQuantity() {
    document.getElementById('quantity').value++;
}

function decreaseQuantity() {
    var currentValue = document.getElementById('quantity').value;
    if (currentValue > 1) {
        document.getElementById('quantity').value--;
    }
}

function closePopup() {
    document.getElementById('p2xpopup').style.display = 'none';
}

