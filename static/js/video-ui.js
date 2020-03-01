var arrow;
var model_arrow;
var mySelection;
var mySelection2;
// model arrow

window.onload = function(e){
    $("#left_arrow_model").click(function (myclick) {
        window.model_arrow = "left";
        $("#left-video").removeClass('hide');
        $("#right-video").removeClass('hide');
        $("#right_arrow").removeClass('hide');
        $("#left_arrow").removeClass('hide');
        $("#equal").removeClass('hide');
        $("#left-model").addClass('glow');
        $("#right-model").removeClass('glow');
        $("#comment").removeClass('hide');
        $("#comment-2").removeClass('hide');
        $("#comment6").removeClass('hide');
        $("#comment7").removeClass('hide');
        document.getElementById("text_left").value = "*";
        document.getElementById("text_right").value = "";
        window.frames['left-video'].contentDocument.getElementById('videojs-vr-player_html5_api').play();
        window.frames['right-video'].contentDocument.getElementById('videojs-vr-player_html5_api').play();
        window.mySelection = '左';
        document.getElementById("mySelection").innerHTML = window.mySelection;
        $("#comment3").removeClass('hide');

    })
    
    $("#equal_model").click(function (myclick) {
        window.model_arrow = "equal";
        $("#left-video").removeClass('hide');
        $("#right-video").removeClass('hide');
        $("#right_arrow").removeClass('hide');
        $("#left_arrow").removeClass('hide');
        $("#equal").removeClass('hide');
        $("#left-model").addClass('glow');
        $("#right-model").addClass('glow');
        $("#comment").removeClass('hide');
        $("#comment-2").removeClass('hide');
        $("#comment6").removeClass('hide');
        $("#comment7").removeClass('hide');
        document.getElementById("text_left").value = "*"
        document.getElementById("text_right").value = "*"
        window.frames['left-video'].contentDocument.getElementById('videojs-vr-player_html5_api').play();
        window.frames['right-video'].contentDocument.getElementById('videojs-vr-player_html5_api').play();
        window.mySelection  = "相等";
        document.getElementById("mySelection").innerHTML = window.mySelection;
        $("#comment3").removeClass('hide');

  
    })
    
    $("#right_arrow_model").click(function (myclick) {
        window.model_arrow = "right";
        $("#left-video").removeClass('hide');
        $("#right-video").removeClass('hide');
        $("#right_arrow").removeClass('hide');
        $("#left_arrow").removeClass('hide');
        $("#equal").removeClass('hide');
        $("#right-model").addClass('glow');
        $("#left-model").removeClass('glow');
        $("#right-model").addClass('glow');
        $("#comment").removeClass('hide');
        $("#comment-2").removeClass('hide');
        $("#comment6").removeClass('hide');
        $("#comment7").removeClass('hide');
        document.getElementById("text_left").value = ""
        document.getElementById("text_right").value = "*"
        window.frames['left-video'].contentDocument.getElementById('videojs-vr-player_html5_api').play();
        window.frames['right-video'].contentDocument.getElementById('videojs-vr-player_html5_api').play();
        window.mySelection  = "右";
        document.getElementById("mySelection").innerHTML = window.mySelection;
        $("#comment3").removeClass('hide');

    })
    
    // video arrow 
    $("#left_arrow").click(function (myclick) {
        window.arrow = "left";
        $("#submitter").removeClass('hide');
        window.mySelection2 = '左';
        $("#comment5").removeClass('hide');        
        document.getElementById("mySelection2").innerHTML = window.mySelection2;
        document.getElementById("text_left_video").value = "*"
        document.getElementById("text_right_video").value = ""        
        $("#left-video").addClass('glow');
        $("#right-video").removeClass('glow');

    })
    
    $("#equal").click(function (myclick) {
        window.arrow = "equal"
        $("#submitter").removeClass('hide')
        window.mySelection2  = "相等";
        $("#comment5").removeClass('hide');        
        document.getElementById("mySelection2").innerHTML = window.mySelection2;
        document.getElementById("text_left_video").value = "*"
        document.getElementById("text_right_video").value = "*"     
        $("#left-video").addClass('glow');
        $("#right-video").addClass('glow');
    }) 

    $("#right_arrow").click(function (myclick) {
        window.arrow = "right"
        $("#submitter").removeClass('hide')
        window.mySelection2  ="右" ;
        $("#comment5").removeClass('hide');        
        document.getElementById("mySelection2").innerHTML = window.mySelection2;
        document.getElementById("text_left_video").value = ""
        document.getElementById("text_right_video").value = "*"  
        $("#left-video").removeClass('glow');
        $("#right-video").addClass('glow');
    }) 
    // Check form valid
       // left arrow
//     $("#submitter").click(function (myclick) {
    
//         // if(Click === true || Drag===true){    
//         if(arrow === "left"){
//             console.log(1234)
//             if($($("#form-col-left > select")[0]).val()!=="" && $($("#form-col-left > select")[1]).val()!=="" && 
//                 $($("#form-col-left > select")[2]).val()!=="" 
//                 && $($("#form-col-left > select")[0]).val() != $($("#form-col-left > select")[1]).val()
//                 && $($("#form-col-left > select")[0]).val() != $($("#form-col-left > select")[2]).val()
//                 && $($("#form-col-left > select")[1]).val() !=$($("#form-col-left > select")[2]).val()
//                 ){
//                     console.log(1234);
//                     $("#submit > input").click();
//                     }
//             else if ($($("#form-col-left > select")[0]).val()=="" || $($("#form-col-left > select")[1]).val()==""
//                     || $($("#form-col-left > select")[2]).val()=="") {
//                         alert('请填写原因');
//                     }
//             else {
//                 alert('请填写不同原因')
//             }
//         }
//         // right arrow
//         if(arrow === "right"){
//             console.log(1234)
//             if($($("#form-col-right > select")[0]).val()!=="" && $($("#form-col-right > select")[1]).val()!=="" && 
//                 $($("#form-col-right > select")[2]).val()!=="" 
//                 && $($("#form-col-right > select")[0]).val() != $($("#form-col-right > select")[1]).val()
//                 && $($("#form-col-right > select")[0]).val() != $($("#form-col-right > select")[2]).val()
//                 && $($("#form-col-right > select")[1]).val() !=$($("#form-col-right > select")[2]).val()
//                 ){
//                     console.log(1234);
//                     $("#submit > input").click();
//                     }
//             else if ($($("#form-col-right > select")[0]).val()=="" || $($("#form-col-right > select")[1]).val()==""
//                     || $($("#form-col-right > select")[2]).val()=="") {
//                         alert('请填写原因');
//                     }
//             else {
//                 alert('请填写不同原因')
//             }
//         }
    
//         // equal arrow 
//         if(arrow === "equal"){
//             console.log(1234)
//             if($($("#form-col-right > select")[0]).val()!=="" && $($("#form-col-right > select")[1]).val()!=="" && 
//                 $($("#form-col-right > select")[2]).val()!=="" 
//                 && $($("#form-col-right > select")[0]).val() != $($("#form-col-right > select")[1]).val()
//                 && $($("#form-col-right > select")[0]).val() != $($("#form-col-right > select")[2]).val()
//                 && $($("#form-col-right > select")[1]).val() !=$($("#form-col-right > select")[2]).val()
//                 && $($("#form-col-left > select")[0]).val()!=="" && $($("#form-col-left > select")[1]).val()!=="" && 
//                 $($("#form-col-left > select")[2]).val()!=="" 
//                 && $($("#form-col-left > select")[0]).val() != $($("#form-col-left > select")[1]).val()
//                 && $($("#form-col-left > select")[0]).val() != $($("#form-col-left > select")[2]).val()
//                 && $($("#form-col-left > select")[1]).val() !=$($("#form-col-left > select")[2]).val()
//                 ){
//                     console.log(1234);
//                     $("#submit > input").click();
//                     }
//             else if ($($("#form-col-right > select")[0]).val()=="" || $($("#form-col-right > select")[1]).val()==""
//                     || $($("#form-col-right > select")[2]).val()=="" || $($("#form-col-left > select")[0]).val()=="" 
//                     || $($("#form-col-left > select")[1]).val()=="" || $($("#form-col-left > select")[2]).val()==""
//                     ) {
//                         alert('请填写原因');
//                     }
//             else {
//                 alert('请填写不同原因')
//             }
//         }
//         // $($("#form-col-left > select")[0]).val()
//     })
}

let isDragging = false;
let startingPos = [];
let Drag = false;
let Click = false;

// mark: string -> ['left', 'right']
function onVideoFrameLoad(mark) {
    console.log(12312312123 + 'dfdf')


    $(window.frames[mark + "-video"].contentDocument.getElementById("videojs-vr-player"))
        .mousedown(function (evt) {
            // console.log('mouse down');
            isDragging = false;
            startingPos = [evt.pageX, evt.pageY];
        })
        .mousemove(function (evt) {
            // console.log('mouse move');
            if (!(evt.pageX === startingPos[0] && evt.pageY === startingPos[1])) {
                isDragging = true;
            }
        })
        .mouseup(function () {
            // console.log('mouse up');
            if (isDragging) {
                Drag = true;
                console.log(Drag);
            } else {
                Click = true;
                console.log(Click);
            }
            isDragging = false;
            startingPos = [];
        });
}


