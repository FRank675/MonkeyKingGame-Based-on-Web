var timeOut;
let timer;
let count = 0;
let counting;
let maxNum;
let flag = false;
let getOutNum = 5;
let fail = 0;
var circleX = getLeft(document.getElementById("container")) + 340;
var circleY = getTop(document.getElementById("container")) + 340;

window.onload = function (){
    document.getElementById("0").setAttribute("tag","1")
}
function yeah(){

    //半径
    var radius = 275;
    //起始角度
    var stard = 0;

    var avd = 360/document.getElementsByClassName("box").length;
    var ahd = avd*Math.PI/180;
    for(var i = 1;i<document.getElementsByClassName("box").length+1;i++){
        $(".box").each(function(index, element){
            $(this).css({"left":Math.sin((ahd*index))*radius+circleX-500,
                "top":Math.cos((ahd*index))*radius+circleY-110,
                "position": "absolute"
            });
        });
    }

}

class Item {
    constructor(icon, backgroundColor) {
        this.$element = $(document.createElement("div"));
        this.icon = icon;
        this.$element.addClass("item");
        this.$element.css("background-color", backgroundColor);
        var i = document.createElement("i");
        $(i).addClass("fi-" + icon);
        this.$element.append(i);
        this.prev = null;
        this.next = null;
        this.isMoving = false;
        var element = this;
        this.$element.on("mousemove", function() {
            clearTimeout(timeOut);
            timeOut = setTimeout(function() {
                if (element.next && element.isMoving) {
                    element.next.moveTo(element);
                }
            }, 10);
        });
    }

    moveTo(item) {
        anime({
            targets: this.$element[0],
            left: item.$element.css("left"),
            top: item.$element.css("top"),
            duration: 700,
            elasticity: 500
        });
        if (this.next) {
            this.next.moveTo(item);
        }
    }

    updatePosition() {
        anime({
            targets: this.$element[0],
            left: this.prev.$element.css("left"),
            top: this.prev.$element.css("top"),
            duration: 200
        });

        if (this.next) {
            this.next.updatePosition();
        }
    }
}

class Menu {
    constructor(menu) {
        this.$element = $(menu);
        this.size = 0;
        this.first = null;
        this.last = null;
        this.timeOut = null;
        this.hasMoved = false;
        this.status = "closed";
    }

    add(item) {
        var menu = this;
        if (this.first == null) {
            this.first = item;
            this.last = item;
            this.first.$element.on("mouseup", function() {
                if (menu.first.isMoving) {
                    menu.first.isMoving = false;
                } else {
                    menu.click();
                }
            });
            item.$element.draggable(
                {
                    start: function() {
                        menu.close();
                        item.isMoving = true;
                    }
                },
                {
                    drag: function() {
                        if (item.next) {
                            item.next.updatePosition();
                        }
                    }
                },
                {
                    stop: function() {
                        item.isMoving = false;
                        item.next.moveTo(item);
                    }
                }
            );
        } else {
            this.last.next = item;
            item.prev = this.last;
            this.last = item;
        }
        this.$element.after(item.$element);


    }

    open() {
        this.status = "open";
        var current = this.first.next;
        var iterator = 1;
        var head = this.first;
        var sens = head.$element.css("left") < head.$element.css("right") ? 1 : -1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: parseInt(head.$element.css("left"), 10) + (sens * (iterator * 50)),
                top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }
    }

    close() {
        this.status = "closed";
        var current = this.first.next;
        var head = this.first;
        var iterator = 1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: head.$element.css("left"),
                top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }
    }

    click() {
        if (this.status == "closed") {
            this.open();
        } else {
            this.close();
        }
    }

}

var menu = new Menu("#myMenu");
var item1 = new Item("list");
var item2 = new Item("play", "#FF5C5C");
var item6 = new Item("refresh", "#537fee");

var item3 = new Item("stop", "#5CD1FF");
var item4 = new Item("plus", "#FFF15C");
var item5 = new Item("minus", "#64F592");

item1.$element.click(function (){
    document.getElementById("audio2").play();
})
item2.$element.click(function (){
    const boxing = document.getElementsByClassName("box");
    let can = false
    var n = 0
    while (1){
        if(n>maxNum){
            console.log("i>maxNum")
            break
        }
        if(boxing[n]!=null&&boxing[n].getAttribute("tag")=="1"){
            console.log("true")

            can = true
            break
        }
        n++
    }
    if(can){
        run()
    }else{
        alert("没猴子呢")
    }
})
item6.$element.click(function () {
    maxNum = 0
    count = 0
    fail = 1
    counting = 0;
    flag = false
    $(".box").each(function () {
        $(this).remove()
    })
})
item3.$element.click(function (){
    stop()
})
item4.$element.click(function (){
    const boxing = document.getElementsByClassName("box");

    if(boxing[0]!=null){
        boxing[0].style.backgroundImage = "url(../image/hello.gif)"
    }

    counting = (count+1).toString()
    maxNum = count+1
    var html = `<div class="box" id=${counting} 
    draggable="true" ondrag="drag_handler(event);" ondragstart="dragstart_handler(event);"></div>`
    $('#container').append(html)

    document.getElementById(counting).setAttribute("tag","1")
    document.getElementById(count+1).innerText = counting

    // console.log(document.getElementById((count+1).toString()).getAttribute("tag"))
    // console.log(document.getElementsByClassName("box"))
    document.getElementById("audio1").play();
    count = count+1

    setTimeout(void yeah(),500);


})
item5.$element.click(function (){
    if(document.getElementsByClassName("box").length>0){
        $("div[class=box]:last").remove()
        maxNum=maxNum-1
        document.getElementById("audio1").play();
        setTimeout(void yeah(),500);
    }
})


menu.add(item1);
menu.add(item2);
menu.add(item3);
menu.add(item6)
menu.add(item4);
menu.add(item5);

$(document).delay(50).queue(function(next) {
    menu.open();
    next();
    $(document).delay(1000).queue(function(next) {
        menu.close();
        next();
    });
});
function stop(){
    clearInterval(timer);
}

function run(){
    var container = document.getElementById("container")
    let i = 1;
    let j = 1;
    let targetX = 253;
    let targetY = 300;
    let speed = 5000;

    getOutNum = parseInt(document.getElementById("amount0").value.replace(/[^0-9]/ig,""))
    speed = speed/ parseInt(document.getElementById("amount").value.replace(/[^0-9]/ig,"")) / 2;

    console.log("speed"+speed)
    timer = setInterval( function () {
        const boxing = document.getElementsByClassName("box");
        if (flag) {
            stop()
            var m = 0
            while (1){
                if(boxing[m]!=null){
                    if(boxing[m].getAttribute("tag")=="1"){
                        break
                    }
                }

                m++
            }
            var posX = parseInt(boxing[m].style.left);

            var posY = parseInt(boxing[m].style.top);
            var step=1;//每次移动的距离
            var step0=1;//每次移动的距离

            step=posX<targetX?step:-step;//step的正负表示了向左或是向右移动
            var step0=posY<targetY?step0:-step0;//step的正负表示了向左或是向右移动
            document.getElementById("victory").play()
            var id = setInterval(frame, 10);
            function frame() {
                boxing[m].style.backgroundImage = "url(../image/7.gif)"

                if (posX == targetX && posY == targetY) {
                    clearInterval(id);
                }
                if(posX != targetX){//当离目标位置的距离大于一步移动的距离
                    if(Math.abs(posX-targetX)<Math.abs(step)){
                        posX = targetX
                        boxing[m].style.left = targetX + "px";
                    }else{
                        posX+=step;
                        boxing[m].style.left = posX + "px";
                    }
                }

                if(posY != targetY){//当离目标位置的距离大于一步移动的距离
                    if(Math.abs(posY-targetY)<Math.abs(step0)){
                        posY = targetY
                        boxing[m].style.top = posY + "px";
                    }else{
                        posY+=step0;
                        boxing[m].style.top = posY + "px";
                    }
                }

            }
            setTimeout(function (){
                document.getElementById("monkeyName").value = ""
                $('#item2').popup({
                    time: 1000,

                    classAnimateShow: 'flipInX',
                    classAnimateHide: 'hinge',
                    onPopupClose: function e() {
                    },
                    onPopupInit: function e() {
                    }
                });
            },5000)

        }

        while (1){
            if(i>maxNum){
                i=0
            }
            if(boxing[i]!=null&&boxing[i].getAttribute("tag")=="1"){
                break
            }
            i++
        }
        if (j == getOutNum) {
            // boxing[i].style.backgroundImage = "url(../image/kings.png) no-repeat" ;
            document.getElementById(`num${getOutNum}`).play();
            boxing[i].style.backgroundImage = "url(../image/sad.gif)"
            boxing[i].setAttribute("tag","0")
            boxing[i].draggable = false
            // setTimeout(document.getElementById("fail").play(),2000)
            fail++
            //console.log("i="+i)
            console.log("fail="+fail)
            console.log("maxNum="+maxNum)

            // console.log(boxing[i].id+"被淘汰"+"报数"+j)
            j = 0;
            // boxing[i].parentNode.removeChild(boxing[i])
            yeah()
        }else{
            document.getElementById(`num${j}`).play();
            boxing[i].style.backgroundImage = `url(../image/monkey${j}.gif)`

        }
        if(fail==maxNum){
            flag=true
        }
        i++;
        j++;
    }, speed);

}


function drag_handler(ev) {
}

function dragstart_handler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    document.getElementById("rubbish").style.visibility = "visible"
}

function drop_handler(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    document.getElementById(data).parentNode.removeChild(document.getElementById(data))
    yeah()
    maxNum=maxNum-1
    document.getElementById("cry").play()
    document.getElementById("rubbish").style.visibility = "hidden"
    // ev.target.appendChild(document.getElementById(data));
}

function dragover_handler(ev) {
    ev.preventDefault();
}


