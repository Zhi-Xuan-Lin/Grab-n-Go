package _24_App_storeOrder.cotroller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import _05_orderProcess.controller.UpdateOrderStatus;
import _05_orderProcess.model.OrderDAO;
import _09_notification.model.NotificationDAO;

@SuppressWarnings("serial")
@WebServlet("/AppStoreOrderChange")
public class AppStoreOrderChange extends HttpServlet {
	Logger lg = Logger.getLogger(UpdateOrderStatus.class);
	private final static String CONTENT_TYPE = "text/html; charset=UTF-8";
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType(CONTENT_TYPE);

		//解開從App取得的Gson
		Gson gson = new Gson();
		BufferedReader br = request.getReader();
		StringBuffer jsonIn = new StringBuffer();
		String line = null;
		while ((line = br.readLine()) != null) {
			jsonIn.append(line);
		}
		System.out.println("jsonIn = " + jsonIn);
		JsonObject jsonObject = gson.fromJson(jsonIn.toString(), JsonObject.class);
		
		String param = jsonObject.get("param").getAsString();
		int ord_id = Integer.parseInt(jsonObject.get("ord_id").getAsString());
		OrderDAO dao = new OrderDAO();
		int n = -1;
		if (param.equals("Cancel")) {
			n = dao.deleteOrder(ord_id);
		} else if (param.equals("toComplete")) {
			String changeStatus = "unpaid";
			n = dao.updateOrderStatus(changeStatus, ord_id);
			NotificationDAO nfDao = new NotificationDAO();
			int x = nfDao.insertNotification(ord_id);
			if(x==1){
				lg.info("訊息新增成功");
			}else lg.error("訊息新增失敗");
		} else if (param.equals("toPaid")) {
			String changeStatus = "paid";
			n = dao.updateOrderStatus(changeStatus, ord_id);
		}
		String changeResult = "";
		if (n == 1) {
			changeResult = "ok";
		} else if (n == -1) {
			changeResult = "fail";
		}
		Map<String, String> map = new HashMap<>();
		map.put("changeResult", changeResult);
		
		//將變動結果送回App
		PrintWriter out = response.getWriter();
		out.println(gson.toJson(map));
		System.out.println("changeResult(map) = " + map);
		out.close();
	}

}
