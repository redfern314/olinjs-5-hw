$(function () {
  $('.submitbutton').click(function () {
    console.log('\''+this.id+'\'');
    console.log($('#input'+this.id).val());
    $.post("/feed", {id:this.id,comment:$('#input'+this.id).val()});
    $('#input'+this.id).val('')
    return false;
  });
});

$(function(){
    $( "#carousel" ).rcarousel({
      width: 600, 
      height: 600, 
      visible:1, 
      step:1
    });
});