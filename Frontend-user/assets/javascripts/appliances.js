var a, b;
(a = 19), (b = 28);
function next() {
  a = b;
  b += 9;
  view_products();
}
function prev(){
  b=a;
  a-=9
    view_products();  
}
function user_name() {
  n = localStorage.getItem("name");
  document.getElementById("user_name").innerText = n;
}
function view_products(){
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/view";
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          iterate_products(products);
          iterate_products_s(products);
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.send();
}
document.getElementById("switch_category").onchange = function(){
  var switch_category = document.getElementById("switch_category");
  var category_index =switch_category.options.selectedIndex;
  var category = switch_category.options[category_index].value;
  switch_categories(category);
}
function switch_categories(category){
  
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/viewByCategory?category="+category;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          iterate_products(products);
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send();
}
function iterate_products_s(products) {
  //select products from full array,paginatoion
  
  (x = 0), (y = 9);

  for (let i = x; i <= y; i++) {
    selected_products[i] = products[i];
  }

  set_products_s(selected_products);
}
function set_products_s(selected_products) {
  for (let i = 0; i <= 9; i++) {
    var src = selected_products[i].product_img;
    var name = selected_products[i].product_name;
    var price = selected_products[i].product_price;
    nameShort = name.slice(0, 20).concat("...");
    document.getElementById("imgs" + i).src = src;
    document.getElementById("texts" + i).innerHTML = nameShort;
    document.getElementById("prices" + i).innerHTML = "₹" + price;
  }
}
function iterate_products(products) {
  //select products from full array,paginatoion

  var selected_products = [];

  document.getElementById("a").innerHTML = a + 1;
  document.getElementById("b").innerHTML = b + 1;
  if(products.length>=9)
  document.getElementById("total").innerHTML = products.length;
  else
  document.getElementById("total").innerHTML = 9;
  for (let i = a, j = 0; i <= b; i++, j++) {
    selected_products[j] = products[i];
  }
  set_products(selected_products);
}
function set_products(selected_products) {
  for (let i = 0; i <= 8; i++) {
    var src = selected_products[i].product_img;
    var name = selected_products[i].product_name;
    nameShort = name.slice(0, 35).concat("...");
    var price = selected_products[i].product_price;
    var pricem = (1.2 * price).toFixed(2);
    document.getElementById("img" + i).src = src;
    document.getElementById("name" + i).innerHTML = nameShort;
    document.getElementById("price" + i).innerHTML = "₹" + price;
    document.getElementById("pricem" + i).innerHTML = "₹" + pricem;
  }
}
var selected_products = [];


function view_by_name(){
  product_name = document.querySelector("#product_name").value;
  console.log(product_name);
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/viewByName?name="+product_name;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          iterate_products(products);
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send();
}
function view_by_interest(){
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/view_by_interest";
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          iterate_products(products);
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send();
}
function view_my_cart(){
  location.href="mycart.html"
}
function Cover_screen(){
  category = "phone cover";
  switch_categories(category);
}
function power_bank(){
  category = "power bank";
  switch_categories(category);
}
function tablet(){
  category = "tablet";
  switch_categories(category);
}
function headphone_earphone(){
  category = "headphone";
  switch_categories(category);
}
function smart_home(){
  category = "smart home";
  switch_categories(category);
}
function laptop(){
  category = "laptop";
  switch_categories(category);
}
function computer_accessories(){
  category = "computer";
  switch_categories(category);
}
function game_zone(){
  category = "game";
  switch_categories(category);
}
function watch(){
  category = "watch";
  switch_categories(category);
}
function television(){
  category = "television";
  switch_categories(category);
}
function speaker(){
  category = "speaker";
  switch_categories(category);
}
function camera(){
  category = "camera";
  switch_categories(category);
}
function game(){
  category = "console";
  switch_categories(category);
}
function AC(){
  category = "AC";
  switch_categories(category);
}
function heater(){
  category = "heater";
  switch_categories(category);
}
function refrigerator(){
  category = "refrigerator";
  switch_categories(category);
}
function washing_machine(){
  category = "washing_machine";
  switch_categories(category);
}
function cricket(){
  category = "cricket";
  switch_categories(category);
}
function badminton(){
  category = "badminton";
  switch_categories(category);
}
function cycling(){
  category = "cycling";
  switch_categories(category);
}
function football(){
  category = "football";
  switch_categories(category);
}
function gym(){
  category = "gym";
  switch_categories(category);
}
function shoes(){
  category = "shoes";
  switch_categories(category);
}
function sports(){
  category = "sports";
  switch_categories(category);
}
function phone(){
  category = "phone";
  console.log("phone")
  switch_categories(category);
}
function send_news() {
	var http = new XMLHttpRequest();

		email=document.querySelector("#email_news").value;

	var data = JSON.stringify(email);
	var url = "https://electronics-mart-api.herokuapp.com/news_letter";
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
			var json = JSON.parse(this.responseText);
			console.log(json.message);
			location.href = "activate.html";
		}
	}
	http.open('post',url,true);
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
	http.setRequestHeader('Content-Type','application/json');
	http.send(data);
}
function get_by_rating(rating){
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/viewbyrating?rating="+rating;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          iterate_products(products);
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send();
}
function star5(){
  get_by_rating(5);
}
function star4_5(){
  get_by_rating(4.5);
}
function star4(){
  get_by_rating(4);
}
function star3_5(){
  get_by_rating(3.5);
}
function star3(){
  get_by_rating(3);
}
function get_by_price(gt,lt){
  var http = new XMLHttpRequest();
  var url = "https://electronics-mart-api.herokuapp.com/viewByPrice?gt="+gt+"&lt="+lt;
  http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
          console.log("yes")
          console.log(http.responseText);
          var json = JSON.parse(this.responseText);
          console.log(json.message);
          products = json.AllProducts;
          console.log(products);
          iterate_products(products);
      }
  }
  http.open('get',url,true);
  http.setRequestHeader('Content-Type','application/json');
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
  http.send();
}
function less_5k(){
  get_by_price(0,5000)
}
function less_10k(){
  get_by_price(5000,10000)
}
function less_20k(){
  get_by_price(10000,20000)
}
function less_35k(){
  get_by_price(20000,35000)
}
function less_50k(){
  get_by_price(35000,50000)
}
function more_50k(){
  get_by_price(50000,999999)
}
function addtocart0(){
  addtocart(selected_products[0].product_id)
}
function addtocart1(){
  addtocart(selected_products[1].product_id)
}
function addtocart2(){
  addtocart(selected_products[2].product_id)
}
function addtocart3(){
  addtocart(selected_products[3].product_id)
}
function addtocart4(){
  addtocart(selected_products[4].product_id)
}
function addtocart5(){
  addtocart(selected_products[5].product_id)
}
function addtocart6(){
  addtocart(selected_products[6].product_id)
}
function addtocart7(){
  addtocart(selected_products[7].product_id)
}
function addtocart8(){
  addtocart(selected_products[8].product_id)
}
function addtocart(p_id) {
	var http = new XMLHttpRequest();
	var details = {
		"p_id" : p_id,
		"p_qty" :1 
	};
	var data = JSON.stringify(details);
	var url = "https://electronics-mart-api.herokuapp.com/addtocart";
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
			var json = JSON.parse(this.responseText);
			console.log(json.message);
			view_my_cart();
		}
	}
	http.open('post',url,true);
  http.setRequestHeader("Authorization",localStorage.getItem("token"));
	http.setRequestHeader('Content-Type','application/json');
	http.send(data);
}
function view_product0(){
  localStorage.setItem("p_id",selected_products[0].product_id)
  quick_view();
}
function view_product1(){
  localStorage.setItem("p_id",selected_products[1].product_id)
  quick_view();
}
function view_product2(){
  localStorage.setItem("p_id",selected_products[2].product_id)
  quick_view();
}
function view_product3(){
  localStorage.setItem("p_id",selected_products[3].product_id)
  quick_view();
}
function view_product4(){
  localStorage.setItem("p_id",selected_products[4].product_id)
  quick_view();
}
function view_product5(){
  localStorage.setItem("p_id",selected_products[5].product_id)
  quick_view();
}
function view_product6(){
  localStorage.setItem("p_id",selected_products[6].product_id)
  quick_view();
}
function view_product7(){
  localStorage.setItem("p_id",selected_products[7].product_id)
  quick_view();
}
function view_product8(){
  localStorage.setItem("p_id",selected_products[8].product_id)
  quick_view();
}

function quick_view(){
  location.href="product_detail.html"
}
user_name();
view_products();