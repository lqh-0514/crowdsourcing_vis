window.onload = function(e){

    $("#index-submitter").click(function (myclick) {
        if (properties_1.value != properties_2.value && 
        properties_1.value != properties_3.value && properties_2.value != properties_3.value){
            $("#submit > input").click();
        }
        else if(properties_1.value =='' ||properties_2.value ==''||properties_3.value =='' ){
            alert('请填写原因')            
        }
        else{
            alert('请填写不同原因')
        }


    })
}