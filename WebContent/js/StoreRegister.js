
// address to LatLng -------------------------------------
function addressToLanlng(addr) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		"address": addr
	}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			MapStatus = status;
			langitude.value = results[0].geometry.location.lng();
			latitude.value = results[0].geometry.location.lat();
//			alert(langitude.value);
//			alert(latitude.value);
		}
	});
}



$(document).ready(function () {
	$('#ttt').hide();
	
});




//----------------------------------------------------------
var MapStatus ;
var sendBtn = document.getElementById("holyshit");
var dateSet = document.getElementById("gygy");
var resetBtn = document.getElementById("cancel");
var idcheck = document.getElementById("accountlink");
var account = document.getElementById("mid");
var password = document.getElementById("password");
var password2 = document.getElementById("password2");
var StoreName = document.getElementById("StoreName");
var StoreType = document.getElementById("StoreType");
var branch = document.getElementById("branch");
var address = document.getElementById("address");
var tel = document.getElementById("tel");
var eMail = document.getElementById("eMail");
var owner = document.getElementById("owner");
var url = document.getElementById("url");
var langitude = document.getElementById("langitude");
var latitude = document.getElementById("latitude");
var midResult = document.getElementById("midResult");
var langitude = document.getElementById("langitude");
var latitude = document.getElementById("latitude");
var formA = document.getElementById("theForm");

window.onload = function () {

	//----------------------------------------------------------
	idcheck.onclick = function () {
		var applyAcc = account.value;
		addressToLanlng(address.value);
		if (!applyAcc) {
			midResult.innerHTML = "<font color='blue' size='-2'>請輸入帳號</font>";
			return;
		}
		var checkId_xhr = new XMLHttpRequest();
		checkId_xhr.open("GET", "Idcheck.do?id=" + applyAcc, true);
		checkId_xhr.send();

		//----------------------------

		checkId_xhr.onreadystatechange = function () {
			if (checkId_xhr.readyState == 4 && checkId_xhr.status == 200) {
				var result = JSON.parse(checkId_xhr.responseText);
				if (result == "OK") {
					midResult.innerHTML = "<font color = 'green' size ='-2'>帳號可以使用喔</font>";
				} else if (result == "NO") {
					midResult.innerHTML = "<font color = 'red' size ='-2'>帳號有人使用囉</font>";
					hasErr = true;
				}
			}
		}
	};



	//----------------------------------------------------------
	dateSet.onclick = function () {
		account.value = "howbigbig";
		password.value = "1111";
		password2.value = "1111";
		StoreName.value = "豪大大雞排";
		StoreType.value = "台式餐廳";
		address.value = "台北市大安區新生南路一段1號";
		branch.value = "北科大店";
		tel.value = "(02)2517-7667";
		eMail.value = "javazh005@gmail.com";
		owner.value = "陳允豪";
		url.value = "http://www.hotstar.com.tw/TW/home/Default.asp";
	}

}

function validateForm(event) {
	addressToLanlng(address.value);
	event.preventDefault(); // this will prevent the submit event.
	var hasErr = false;

	var passwordResult = document.getElementById("passwordResult");
	var password2Result = document.getElementById("password2Result");
	var StroeNameResult = document.getElementById("StroeNameResult");
	var addressResult = document.getElementById("addressResult");
	var telRes = document.getElementById("telResult");
	var eMailResult = document.getElementById("eMailResult");
	var ownerResult = document.getElementById("ownerResult");

	//-----------------------

	if (!account.value) {
		midResult.innerHTML = "<font color = 'red' size ='-2'>請輸入帳號</font>";
		hasErr = true;
	} else {
		midResult.innerHTML = "";
	}

	//------------------------------

	if (!password.value) {
		passwordResult.innerHTML = "<font color = 'red' size ='-2'>請輸入密碼</font>";
		hasErr = true;
	} else
		passwordResult.innerHTML = "";
	console.log("hasErr : password" + hasErr);
	//------------------------------
	if (!password2.value) {
		password2Result.innerHTML = "<font color = 'red' size ='-2'>請輸入確認密碼</font>";
		hasErr = true;
	} else if (!(password2.value == password.value)) {
		password2Result.innerHTML = "<font color = 'red' size ='-2'>與之前密碼不相符</font>";
		hasErr = true;
	} else {
		console.log("hasErr : password2" + hasErr);
		password2Result.innerHTML = "";
	}
	//------------------------------
	if (!StoreName.value) {
		StoreNameResult.innerHTML = "<font color = 'red' size ='-2'>請輸入店家名稱</font>";
		hasErr = true;
	} else {
		console.log("hasErr : StoreName" + hasErr);
		StoreNameResult.innerHTML = "";
	}
	//------------------------------
	if (!address.value) {
		addressResult.innerHTML = "<font color = 'red' size ='-2'>請輸入店家住址</font>";
		hasErr = true;
	} else {
		console.log("hasErr : address" + hasErr);
		addressResult.innerHTML = "";
	}
	//------------------------------
	if (!tel.value) {
		alert("aaaa")
		telRes.innerHTML = "<font color = 'red' size ='-2'>請輸入店家電話</font>";
		hasErr = true;
	} else {
		console.log("hasErr : tel" + hasErr);
		telRes.innerHTML = "";
	}
	//------------------------------
	if (!eMail.value) {
		eMailResult.innerHTML = "<font color = 'red' size ='-2'>請輸入店家E-mail</font>";
		hasErr = true;
	} else
		console.log("hasErr : eMail" + hasErr);
	eMailResult.innerHTML = "";
	//------------------------------
	if (!owner.value) {
		ownerResult.innerHTML = "<font color = 'red' size ='-2'>請輸入店家負責人</font>";
		hasErr = true;
	} else {
		console.log("hasErr : owner" + hasErr);
		ownerResult.innerHTML = "";
	}


	//------------------------------
	if (hasErr) {
		return false;
	} else {
		$('#ttt').show();
		setTimeout(function() {
			formA.submit();
		}, 100);

		// console.log(account.value);
		// console.log(password.value);
		// console.log(password2.value);
		// console.log(StoreName.value);
		// console.log(address.value);
		// console.log(tel.value);
		// console.log(owner.value);
		// console.log(owner.value);
		// console.log(langitude.value);
		// console.log(langitude.value);
	}


}


	  //----------------------------------------------------------
