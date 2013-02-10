$(function () {
  $('#adminform').on('submit', function () {
    $.post("/admin", $('#adminform').serialize(), function(data) {
        if(data!=""){
            alert(data);
        }
    });
    $("#main").html("<p>Added successfully!</p>");
    return false;
  });
});