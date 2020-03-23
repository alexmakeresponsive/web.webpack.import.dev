import body from "./templates/index.handlebars";









document.addEventListener("DOMContentLoaded", function() {

    var div = document.createElement('div');

    div.innerHTML = body({});

    document.body.appendChild(div);
});


