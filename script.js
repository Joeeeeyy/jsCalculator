$(document).ready(() => {
    $screen = $("#display");

    $("#clear").on('click', () => {
        $screen.html('0');
    });


    $(".number").on('click', (e) => {
        const regex = /^(0{1,})(\w)$/;
        let newDisplay = $screen.html() + $(e.currentTarget).html();

        // Remove 0 at the beginning
        if (regex.test(newDisplay)) {
            newDisplay = newDisplay.replace(regex, '$2');
        }

        $screen.html(newDisplay);
    });

    $(".decimal").on('click', (e) => {
        const regex = /[.]{2,}$/;
        const regex2 = /(\d+[.]\d+)([.])$/;

        let newDisplay = $screen.html() + $(e.currentTarget).html();

        // Remove 2 continuous decimal points
        // Ex: 5.. => 5.
        if (regex.test(newDisplay)) {
            newDisplay = newDisplay.replace(regex, '.');
        }

        // Remove multi decimal points within a number 
        // Ex 5.5.5. => 5.55
        if (regex2.test(newDisplay)) {
            newDisplay = newDisplay.substring(0, newDisplay.length - 1);
        }

        $screen.html(newDisplay);
    });

    $(".operator").on('click', (e) => {
        const regex = /[+-\/*]$/;
        const currentDisplay = $screen.html();
        const newOperator = $(e.currentTarget).attr('value');
        let newDisplay = "";

        if (regex.test(currentDisplay) && newOperator !== "-") {
            if (regex.test(currentDisplay[currentDisplay.length - 2])) {
                // Case 5*-+5 => 5+5
                newDisplay = currentDisplay.substring(0, currentDisplay.length - 2) + newOperator;
            } else {
                // Case 5*+5 => 5+5 
                newDisplay = currentDisplay.substring(0, currentDisplay.length - 1) + newOperator;
            }
        } else {
            newDisplay = currentDisplay + newOperator;
        }

        $screen.html(newDisplay);
    });

    $(".equals").on('click', () => {
        $screen.html(eval($(".screen").html()));
    });

    $("#neg").add("#percent").on('click', function() {
        alert("Nope! Sorry for being such a Negative Nelly, but I'm 100% not working. Stay 100% positive!");
    });

    $(".operator").hover(function() {
        $(this).css("background-color", "#e15f41");
    }, function() {
        $(this).css("background-color", "#fa8231");
    });

    $(".equals").hover(function() {
        $(this).css("background-color", "#218c74");
    }, function() {
        $(this).css("background-color", "#1dd1a1");
    });
});