var interested_in=[];
function setColor(btn) {
	var property = document.getElementById(btn);
	property.style.backgroundColor = "#292560";
	property.style.color = "white";
	interested_in.push(document.getElementById(btn).value);
}
function register(){
	Houseno = document.querySelector("#houseno").value;
	Landmark = document.querySelector("#landmark").value;
	City = document.querySelector("#city").value;
	State = document.querySelector("#state").value;
	Pincode = document.querySelector("#pincode").value;
	if(Houseno && Landmark && City && State && Pincode){
		Swal.fire({
			title: 'Please Wait..!',
			html: 'Creating Your Account...',
			timer: 2000,
			timerProgressBar: true,
			didOpen: () => {
			  Swal.showLoading()
			  timerInterval = setInterval(() => {
			  }, 100)
			},
			willClose: () => {
			  clearInterval(timerInterval)
			}
		  }).then((result) => {
		  });
		var user = {
			name :localStorage.getItem("name"),
			email :localStorage.getItem("email"),
			pwd :localStorage.getItem("pass"),
			address : {
				Houseno:Houseno,
				Landmark:Landmark,
				City:City,
				State:State,
				Pincode:Pincode,
			},
			interested_in:interested_in
		}
		var http = new XMLHttpRequest();
		var data = JSON.stringify(user);
		var url = "https://electronics-mart-api.herokuapp.com/register";
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				console.log(http.responseText);
				var json = JSON.parse(this.responseText);
				console.log(json.message);
				location.href = "activate.html";
			}
			if(http.status==500){
				Swal.fire({
					icon: 'warning',
					title: 'Oops...',
					text: 'Oops Something went wrong...',
				});
			}
		}
		http.open('post',url,true);
		http.setRequestHeader('Content-Type','application/json');
		http.send(data);

	}
	else{
		Swal.fire({
			icon: 'warning',
			title: 'Oops...',
			text: 'All fields are required...',
		  });
	}
}
function login(){
	location.href="login.html";
}
