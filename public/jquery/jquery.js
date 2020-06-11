var qltitle = $(".option__nice-select");
var qlcontent = $(".option__nice-select ul");
var icon = $(".fa-caret-down");
for (let i = 0; i < qltitle.length; i++) {
    $(qltitle[i]).click(function(e) {
        e.preventDefault();
        $(qlcontent[i]).slideToggle();
        $(qlcontent[i]).parent().siblings().children('.option__nice-select ul').slideUp();
    });
}