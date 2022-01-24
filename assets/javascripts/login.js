function login() {
	var http = new XMLHttpRequest();
	email = document.querySelector("#email").value;
	pwd = document.querySelector("#pwd").value;
	if(email){
		if(pwd){
			var details = {
				"email" :email ,
				"pwd" : pwd
			};
			var data = JSON.stringify(details);
			var url = "https://electronics-mart-api.herokuapp.com/login";
			http.onreadystatechange = function() {
				if(http.readyState == 4 && http.status == 200) {
					console.log(http.responseText);
					var json = JSON.parse(this.responseText);
					localStorage.setItem("token",json.token);
					console.log(json.message);
					localStorage.setItem("name",json.name);
					Swal.fire({
						title: 'You are Successfully logged In!',
						html: 'Redirecting to Home page.',
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
						location.href="../index.html"
					  });
				}
				if(http.status==404){
					Swal.fire({
						icon: 'warning',
						title: 'Oops...',
						text: 'Invalid Email or Password...',
					});
				}
				if(http.status==201){
					Swal.fire({
						icon: 'warning',
						title: 'Oops...',
						text: 'You have entered an Old password...',
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
				text: 'No Password found...',
			  });
		}
	}
	else{
		Swal.fire({
			icon: 'warning',
			title: 'Oops...',
			text: 'No Email found...',
		  });
	}
}
function register(){
	location.href = "register.html";
}