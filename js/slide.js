
; (function ($) {
    var box = document.getElementById("bm_content");
    var l1 = document.getElementById("tb1");
    var l2 = document.getElementById("tb2");
    autoScroll();
    function autoScroll() {
        var product = RenderList();
        l1.innerHTML = product;
        if (l1.offsetHeight > box.offsetHeight) {
            l2.innerHTML = l1.innerHTML;//克隆list1的数据，使得list2和list1的数据一样
            scrollMove = setInterval(scrollup, 30);//数值越大，滚动速度越慢
            box.onmouseover = function () {
                clearInterval(scrollMove)
            }
        }
    }
    function scrollup() {
        //滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
        if (box.scrollTop >= l1.offsetHeight) {
            box.scrollTop = 0;
        } else {
            box.scrollTop++;
        }
    }
    //鼠标离开时，滚动继续
    box.onmouseout = function () {
        scrollMove = setInterval(scrollup, 30);
    }
    function RenderList() {
        var str = '';
        a =  $.ajax({
            url: "../json/monkey.json",//json文件位置，文件名
            type: "GET",//请求方式为get
            dataType: "json", //返回数据格式为json
            async: false,
            data:{
                name : name,
                num : this.num,
                time : this.time,
            },
            success: function(data) {//请求成功完成后要执行的方法
                for (var i = 0; i < data.length; i++) {
                    str += '<tr>';
                    str += '<td class="ellipsis">';
                    str += '<img src="/image/portrait_default.png" style="display: inline-block"/>';
                    str += '<span class="ellipsis" title="Sun" style="margin-left: 10px;">' + data[i].name + '</span>';
                    str += '</td>';
                    str += '<td class="ellipsis" title="10" style="margin-left: 10px;">'+ data[i].num+ '</td>';
                    str += '<td class="ellipsis" title="12/29 12.12" style="margin-left: 10px;">' + data[i].time + '</td>';
                    str += ' </tr>';
                }
            }
        });
        return str;
    }

})(jQuery)
