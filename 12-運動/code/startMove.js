/* 封裝step1:先思考要封裝函數所要傳遞的參數，不需要先思考功能
* obj:操作對象
* json: [att : target]
* att: 對應成 key
* target: 對應成 json[key]
*/

//＊緩衝運動
function startMove(obj, json) {
  clearInterval(obj.timer);

  //速度
  var speed = 0;
  //操作的屬性值
  var currentValue = 0;

  obj.timer = setInterval(function () {
    //*解決問題方法，用以判斷是否該停止時鐘
    var isStop = true;

    //*循環修改屬性值
    for (key in json){
      // 1. 獲取當前值
      if (key == 'opacity') {   //特定設定透明度部分
        currentValue = parseInt(getStyle(obj, key) * 100); //讓數值在0-100 ，取出來的值在0-1
      } else {
        currentValue = parseInt(getStyle(obj, key));
      }

      // 2. 設置速度
      speed = (json[key] - currentValue) / 7;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

      // 3. 運動處理
      currentValue += speed;

      if (key == 'opacity') {
        obj.style.opacity = currentValue / 100; // 非IE部分
        obj.style.filter = 'alpha(opacity:' + currentValue + ')'; // IE部分
      } else {
        obj.style[key] = currentValue + 'px';
      }
      
      //* 4. 是否停止時鐘: 只要是有一個未達到當前值的話就不會停止
      if(json[key] != currentValue){
        isStop = false;
      }
    }

    //* 最後判斷是否停止時鐘
    if(isStop){
      clearInterval(obj.timer);
    }
  }, 30);
}

//獲取物件屬性函數
function getStyle(obj, att) {
  return window.getComputedStyle ? getComputedStyle(obj)[att] : obj.currentStyle[att];
}
