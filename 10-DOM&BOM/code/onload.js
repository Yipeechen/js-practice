// 獲取元素樣式 
// 兼容性操作：getComputedStyle（非IE）/ currentStyle（IE）
// object: 元素對象 / att: 需要獲取的属性()
function getStyle(object, att) {
	return window.getComputedStyle ? getComputedStyle(object)[att] : object.currentStyle[att];   // 更優化成：三目判斷式
}

// 通過id獲取對應的元素
//function $(id) {
//	return document.getElementById(id);
//}

function $(str){  // window.onload 的封裝[ 頁面引入後，不用在額外寫 ]
	if(typeof str === 'string'){
		return document.getElementById(str);
	} else if(typeof str === 'function'){
		window.onload = str;
	}
}
