var monkey0 = document.getElementById("monkey0").cloneNode()
var target = document.getElementById("place")
let chosenNum = 3;
let callIndex;
let monkeyIndex;
let timer;
let selectedId;
var audio;


window.onload = function () {
    callIndex = 1;
    monkeyIndex = 1;
}
var count = [];

monkey0.ondragstart = function (){
    console.log("drag start");
}
monkey0.ondragend = function (){
    console.log("drag end");
}

target.ondragover = function (e) {
//            阻止拖拽的默认行为
    e.preventDefault();
}

target.ondrop = function () {
//            将拖拽的元素追加到 two里面来
    var newMonkey = document.createElement('newMonkey');
    newMonkey.className = "monkey";
    newMonkey.id="monkey8";
    newMonkey.style.cssText = '    width: 200px;\n' +
        '    height: 200px;\n' +
        '    /*backgroud:rgba(0,0,0,0);*/\n' +
        '    float: left;\n' +
        '    background:url("../image/monkeys.png") no-repeat;';
    newMonkey.draggable = true;
    newMonkey.ondragstart = drag(event);
    newMonkey.ondragend = dend(event);
    document.getElementById("place").appendChild(newMonkey);
    console.log("node:" + newMonkey.nodeType);
}


// monkey1.ondragstart = function (){
//     console.log("drag start");
// }
// monkey1.ondragend = function (){
//     console.log("drag end");
// }

// rubbish.ondragover = function (e) {
// //            阻止拖拽的默认行为
//     e.preventDefault();
// }
//
// rubbish.ondrop = function () {
// //            将拖拽的元素追加到 two里面来
// //     this.removeChild(monkey1);
//     monkey1.parentNode.removeChild(monkey1); // 让 “要删除的元素” 的 “父元素” 删除 “要删除的元素”
//
// }


function playAudio(){
    audio = new Audio(`../music/${callIndex}.mp3`);
    audio.play();
}

function show(){
    var monkey = document.getElementById(`monkey${monkeyIndex}`)
    for(i = 1; i < 9; i++){
        if(count.length!=7 && !count.includes(i)){
            temp_monkey = document.getElementById(`monkey${i}`)
            temp_monkey.style.backgroundImage=`url(../image/monkeys.png)`;
        }
    }
    if(count.length!=7){
        playAudio();
        monkey.style.backgroundImage=`url(../image/${callIndex}.png)`
    }
    // monkey.style.backgroundImage=`url(../image/${callIndex}.png)`
    if(callIndex == chosenNum){
        if(count.length==7){
            monkey.style.backgroundImage=`url(../image/king0.png)`;
            count.push(monkeyIndex);
        }else{
            playAudio();
            monkey.style.backgroundImage=`url(../image/getOut.png)`;
            count.push(monkeyIndex);
        }
    }
}
function callNumber(){
    timer = setInterval(function() {
        if(count.length==8){
            stop();
        }
        if (callIndex == 4) {
            callIndex = 1;
        }
        if(monkeyIndex == 9){
            monkeyIndex = 1;
        }
        while(count.includes(monkeyIndex)){
            monkeyIndex++
            if(monkeyIndex == 9){
                monkeyIndex = 1;
            }
        }
        show();
        callIndex++;
        monkeyIndex++
    }, 1000);
}

function stop(){
    clearInterval(timer);
}


function drag(event) {
    event.dataTransfer.setData("name",event.target.id)
    console.log("pppp"+ event.target.id);
    selectedId = event.target.id;
}
function dend(event) {
}
//拖拽进入标签范围
function enter(event) {
    console.log("释放删除");
    // document.getElementById("div").innerHTML = "释放删除";
}
function leave(event) {
    console.log("垃圾箱");
    // document.getElementById("div").innerHTML = "垃圾箱";
}
function drop(event) {

    //阻止浏览器默认事件
    event.preventDefault();
    //document.getElementById("div").innerHTML = "正在删除";
    var id = event.dataTransfer.getData("name");
    console.log("id:"+id);
    console.log("dafasfa");
    var ul = document.getElementById("place");
    ul.removeChild(document.getElementById(selectedId));
}
function over(event) {
    event.preventDefault();
}
