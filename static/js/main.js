// AJAX for posting
function add_task() {
    console.log("create post is working!") // sanity check
    $.ajax({
        url : "add_task/", // the endpoint
        type : "POST", // http method
        data : { task : $('#task').val() }, // data sent with the post request

        // handle a successful response
        success : function(json) {
            $('#task').val(''); // remove the value from the input
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};