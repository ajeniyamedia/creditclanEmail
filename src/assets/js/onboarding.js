function direct() {
    $("#dl").css('boxShadow', "inset 0 0 0 150px rgba(39, 150, 25, 0.6)");
    $('#dlinp').attr('checked', 'true');
    $('#third').css({ 'display': 'none' });
    $('#four').fadeIn('slow');
    $('.active').next().addClass('active');
}

function peer() {
    document.getElementById("p2p").style.boxShadow = "inset 0 0 0 150px rgba(39, 150, 25, 0.6)";
    $('#ppinp').attr('checked', 'true');
    $('#third').css({ 'display': 'none' });
    $('#four').fadeIn('slow');
    $('.active').next().addClass('active');
}

function crowd() {
    document.getElementById("cl").style.boxShadow = "inset 0 0 0 150px rgba(39, 150, 25, 0.6)";
    $('#clinp').attr('checked', 'true');
    $('#third').css({ 'display': 'none' });
    $('#four').fadeIn('slow');
    $('.active').next().addClass('active');
}

function lending() {
    $("#icon-background5").css("border-color", "green");
    $('.fa-users').css('color', 'green');
    $('#lendinginp').attr('checked', 'true');
    $('#first').css({ 'display': 'none' });
    $('#sec').fadeIn('slow');
    $('.active').next().addClass('active');
}

function serve() {
    $("#icon-background6").css("border-color", "green");
    $('.fa-sitemap').css('color', 'green');
    $('#serviceinp').attr('checked', 'true');
    $('#first').css({ 'display': 'none' });
    $('#sec').fadeIn('slow');
    $('.active').next().addClass('active');
}

function checkForm(form) {
    if (!form.terms.checked) {
        form.terms.focus();
        return false;
    }
    return true;
}

// Register the event
var registerEvent = function() {
    $(".next_btn").click(function(e) { // Function Runs On NEXT Button Click
        e.preventDefault();
        if ($(".regform").valid()) {
            $(this).parent().css({ 'display': 'none' });
            $(this).parent().next().fadeIn('slow');
            $('.active').next().addClass('active');
        }
    });

    $(".pre_btn").click(function() { // Function Runs On PREVIOUS Button Click
        $(this).parent().prev().fadeIn('slow');
        $(this).parent().css({ 'display': 'none' });
        $('.active:last').removeClass('active');
    });

    $("body").find(".regform").validate({
        errorClass: "error",
        errorElement: "span",
        highlight: function(element) {         jQuery(element).closest('.form-group').addClass('has-error');     },
            unhighlight: function(element) {         jQuery(element).closest('.form-group').addClass('has-success').removeClass('has-error');     },
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                // error.insertAfter(element);
            }
        }
    });

    $('.credit').tooltip();
    $('#ussdSelect').click(function() {
        $("#icon-background").css("border-color", "green");
        $('.fa-envelope-open').css('color', 'green');
        $('#ussd').attr('checked', 'true');
        $('#four').css({ 'display': 'none' });
        $('#fif').fadeIn('slow');
        $('.active').next().addClass('active');
    });

    $('#mobSelect').click(function() {
        $("#icon-background2").css("border-color", "green");
        $('.fa-mobile').css('color', 'green');
        $('#mob').attr('checked', 'true');
        $('#four').css({ 'display': 'none' });
        $('#fif').fadeIn('slow');
        $('.active').next().addClass('active');
    });

    $('#webSelect').click(function() {
        $("#icon-background3").css("border-color", "green");
        $('.fa-laptop').css('color', 'green');
        $('#web').attr('checked', 'true');
        $('#four').css({ 'display': 'none' });
        $('#fif').fadeIn('slow');
        $('.active').next().addClass('active');
    });

    $('#chatSelect').click(function() {
        $("#icon-background4").css("border-color", "green");
        $('.fa-comment-alt').css('color', 'green');
        $('#chat').attr('checked', 'true');
        $('#four').css({ 'display': 'none' });
        $('#fif').fadeIn('slow');
        $('.active').next().addClass('active');
    });
}


// Fetch Onboarding Data. This is called by Angular
var fetchOnboardingData = (function() {
    return {
        now: function(e) {
            e.preventDefault();
            if ($(".regform").valid()) {

                var operations = [];

                $("input[name='operation']:checked").each(function(e) {
                    operations[e] = $(this).val()
                });

                var chanels = [];
                $("input[name='chanel']:checked").each(function(i) {
                    chanels[i] = $(this).val()
                });

                var serve = [];
                $("input[name='creditClan']:checked").each(function(i) {
                    serve[i] = $(this).val()
                });

                var obj = {
                    business_name: $("input[name='biz-name']").val(),
                    name: $("input[name='contact-name']").val(),
                    email: $("input[name='email']").val(),
                    phone: $("input[name='phone']").val(),
                    address: $("#add").val(),
                    operation: operations,
                    channel: chanels,
                    services: serve
                }

                return obj;
            } else {
                alert("Review and Accept our Terms and Conditions to Continue.");
                return false;
            }
        }
    }
})();