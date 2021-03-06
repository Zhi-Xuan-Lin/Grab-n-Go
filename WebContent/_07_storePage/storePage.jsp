<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>店家資訊-Grab &amp; Go</title>
            <meta name="keywords" content="Grab &amp; Go, 訂餐, 帶著就走, 上班族" />
            <meta name="description" content="短短的午休時間您受夠了在水深火熱中跟人家相爭排隊買午餐嗎? Grab &amp; Go 預約訂餐系統讓您輕鬆帶著走。" />
            <meta name="author" content="Grab &amp; Go">
            <meta name="copyright" content="Grab &amp; Go">
            <meta name="robots" content="index, follow">
            <meta name="GOOGLEBOT" content="index, follow">
            <meta name="distribution" content="GLOBAL">
            <meta property="og:title" content="Grab &amp; Go " />
            <meta property="og:description" content="短短的午休時間您受夠了在水深火熱中跟人家相爭排隊買午餐嗎? Grab &amp; Go 預約訂餐系統讓您輕鬆帶著走。" />
            <meta property="og:site_name" content="Grab &amp; Go" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://www.chewchew.com.tw" />
            <meta property="og:image" content="http://lovegreenfood.com/gg/fb.jpg" />
            <link rel="image_src" href="http://lovegreenfood.com/gg/fb.jpg" />
            <link rel="SHORTCUT ICON" href="../images/favicon.ico" />
            <link rel="icon" href="../images/favicon.ico" type="image/ico" />
            <!--main css-->
            <link href="../css_web/default.css" rel="stylesheet" type="text/css" />
            <link href="../css_web/styles.css" rel="stylesheet">
            <link href="../css_web/component.css" rel="stylesheet" type="text/css" />
            <link href="../css_web/slick.css" rel="stylesheet" type="text/css">
            <link href="../css_web/animate.css" rel="stylesheet" type="text/css" />
            <jsp:useBean id="prodType" class="_03_Product.model.ProductTypeDAO" scope="session"></jsp:useBean>
            <c:set target="${prodType}" property="restNameA" value="${clickRest['rest_name']}" />
            <jsp:useBean id="product" class="_03_Product.model.ProductDAO" scope="session" />
            <c:set target="${product}" property="rest_id" value="${clickRest.rest_id}" />

            <jsp:useBean id="order" class="_05_orderProcess.model.OrderDAO" scope="session" />


        </head>

        <body id="top" class="cbp-spmenu-push">
            <jsp:include page="../_IncludeJsp/User_mainNav.jsp" />
            <input type="hidden" id="showMsg" value="${msg}">
            <input type="hidden" id="anchor" value="${anchor}">
            <input type="hidden" id="rest" value="${clickRest.rest_id}">
            <!-- 店家資訊 -->
            <jsp:include page="../_IncludeJsp/StorePage_MainInfo.jsp" />
            <main>
                <div class="brcame">
                    <a href="../indexA.jsp">首頁</a>/ ${clickRest.rest_name}&nbsp;
                    <c:if test="${clickRest.rest_branch!='null'}">${clickRest.rest_branch}</c:if>
                </div>
                <%--         <div>${msg}</div> --%>
                    <%--         <div>${orderRest}</div> --%>
                        <section class="content">
                            <div class="tabs animated-fade">
                                <div class="tabArea wow fadeInUp">
                                    <c:set var="x" value="0" />
                                    <ul class="tabLinks slider">
                                        <c:forEach var="foodType" items="${prodType.allProductType}" varStatus='vs'>
                                            <c:set var="Num" value="${x=x+1}" />
                                            <li id="tab${Num}A" <c:if test="${vs.first}"> class ="active"</c:if>><a href="#tab${Num}">${foodType}</a></li>
                                        </c:forEach>
                                    </ul>
                                </div>


                                <c:set var="y" value="0" />
                                <div class="tab-content">
                                    <c:forEach var="foodType2" items="${prodType.allProductType}" varStatus='vs'>
                                        <div id="tab${y=y+1}" class="tab<c:if test='${vs.first}'> active</c:if>">
                                            <c:set target="${product}" property="typeName" value="${foodType2}" />
                                            <c:forEach var="food" items="${product.productByType}" varStatus='vs'>
                                                <div class="storeMenuList wow fadeInUp">
                                                    <figure>
                                                        <img src=${pageContext.servletContext.contextPath}/_00_init/getImage?id=${food.prod_id} ' alt="${food.prod_name}" title="${food.prod_name}">
							<div class="mask" id="${food.prod_id}" onclick="clickMe(this)">
								<a href="#">我要訂餐</a>
							</div>
							</figure>
							<div class="storeMenuName" id="${food.prod_id}"
								onclick="clickMe(this)">
								<a href="#">${food.prod_name}</a>
							</div>
							<div class="storeMenuDes">${food.prod_desc}</div>
							<div class="storeMenuPrice">$${food.prod_price}</div>
						</div>
					</c:forEach>
				</div>
			</c:forEach>
		</div>
	</div>
	</section> </main>
	<!--店家訂購內容 (用js塞值)-->
	<div class="menuDetail">
		<div class="searchBg"></div>
		<section class="searchContent">
		<div class="closeBtn">
			<i class="icon-close" title="關閉"></i>
		</div>
		<form action="addItem.do" method="POST">
			<figure>
			<img id="proImg" src="" alt="" title=""></figure>
			<div class="menuInfo">
				<h4 id="title"></h4>
				<p class="wRed" id="price"></p>
				<p id="desc"></p>
				<input type="hidden" id="idKey" name="prod_id" value=""> <input
					type="hidden" id="itemName" name="itemName" value=""> <input
					type="hidden" id="itemType" name="itemType" value=""> <input
					type="hidden" id="itemPrice" name="itemPrice" value=""> <input
					type="hidden" id="rest_id" name="rest_id"
					value="${clickRest.rest_id}">
				<p>
					<textarea id="specialNeed" placeholder="請輸入特殊需求，例如: 大辣*1，不辣*3"
						rows="3" name="specialNeed" id="else"></textarea>
				</p>
				<div  class="menuCount">
					數量<input type="number" name="count" id="count" value="1" min="1">
				</div>
				<div class="addBtn">
					<input name="submit" type="submit" id="submit" value="加入購物車">
				</div>
			</div>
		</form>
		</section>
	</div>
	<!--店家訂購內容 end-->
	<!--搜尋-->
	<jsp:include page="../_IncludeJsp/User_search.jsp" />
	<jsp:include page="../_IncludeJsp/User_NotificationPanel.jsp" />
	<footer> <figure>
	<img src="../images/share/logo.svg" alt="Grab &amp; Go"
		title="Grab &amp; Go"></figure>
	<p>Copyright © Garb and Go All rights reserved.</p>
	<a href="#" class="backToTop">TOP</a></footer>
	<!--main js-->
	<!--[if lt IE 8]><script type="text/javascript" src="javascript/html5.js"></script><![endif]-->
	<script type="text/javascript"
		src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<!--nav-->
	<script type="text/javascript" src="../javascript/classie.js"></script>
	<!--animation js-->
    <script type="text/javascript" src="../javascript/wow.js"></script>
	<!--silder-->
	<script src="../javascript/slick.js"></script>
	<script>
		$(function() {
			$(".tabLinks").slick({
				dots : false,
				infinite : false,
				slidesToShow : 10,
				slidesToScroll : 1,
				responsive : [ {
					breakpoint : 1680,
					settings : {
						slidesToShow : 8,
					}
				}, {
					breakpoint : 1280,
					settings : {
						slidesToShow : 6,
					}
				}, {
					breakpoint : 900,
					settings : {
						slidesToShow : 4,
					}
				}, {
					breakpoint : 600,
					settings : {
						slidesToShow : 3,
					}
				}, {
					breakpoint : 300,
					settings : {
						slidesToShow : 2,
					}
				} ]
			});
		});
	</script>
	<!--tabs-->
	<script src="../javascript/tabs.js"></script>
	<!--loading js-->
    <script>
        $(window).load(function() {
            $("#loading").fadeOut(500);
        })
    </script>
    <!--SmoothScroll js-->
    <script type="text/javascript" src="../javascript/SmoothScroll_v1.2.1.js"></script>
	<!--share js-->
	<script src="../javascript/share.js"></script>
	<script src="../js/getProductInfo.js"></script>
</body>

</html>
