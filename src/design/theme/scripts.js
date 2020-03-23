

// var $ = vendorScripts.jQuery;

// console.log( $ == $2 );
// console.log('1 = ', $ );
// console.log( $2 );

$( document ).ready(function() {

    // var $ = jQuery;
    // console.log($);

    var modalWrapper = $('#exampleModal');
    // console.log(modalWrapper);

    modalWrapper.modal('show');

    function hideModal() {
        modalWrapper.modal('hide');
        console.log('modal closed!');
    }

    setTimeout(hideModal, 2000);
});
