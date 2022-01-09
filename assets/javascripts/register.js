function save(){
	name=document.querySelector("#name").value;
	email=document.querySelector("#email").value;
	pass=document.querySelector("#pwd").value;
	localStorage.setItem("name",name);
	localStorage.setItem("email",email);
	localStorage.setItem("pass",pass);
	confirm_pass = document.querySelector("#confirm_pwd").value;
	if(name && email && pass && confirm_pass){
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
			var http = new XMLHttpRequest();
			let doc = {
				email : email
			}
			var data = JSON.stringify(doc);
			var url = "https://electronics-mart-api.herokuapp.com/check_email";
			http.onreadystatechange = function() {
				if(http.readyState == 4 && http.status == 200) {
					console.log(http.responseText,http.status);
					if(http.status==200){
						if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pass)){
							if(pass!=confirm_pass){
								Swal.fire({
									icon: 'warning',
									title: 'Oops...',
									text: "Those passwords didn’t match. Try again....",
								});
							}
							else{
								location.href = "address_input.html"
							}
						}
						else{
							Swal.fire({
								icon: 'warning',
								title: 'Oops...',
								text: 'Password must contain atleast 8 characters, atleast one numeric and atleast one symbol.',
							});
						}
					}
				}
				if(http.readyState == 4 && http.status == 500){
					Swal.fire({
						icon: 'warning',
						title: 'Oops...',
						text: 'That Email is already registered, Use any other Email for registeration',
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
				text: 'Invalid Email format....',
			});
		}
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
	location.href="login.html"
}