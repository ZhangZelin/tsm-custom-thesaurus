class BaseThesaurus extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '', source: 'sourceStandard', type: 'synonyms' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSourceChange = this.handleSourceChange.bind(this);
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		//console.log("doc is " + document.getElementById('thesinput').value);
		this.state.value = document.getElementById('thesinput').value;
		var TYPE = document.getElementById("sel1").value.toLowerCase();
		//console.log("state is " + this.state.value);						
		if (this.state.source === "sourceStandard") {
			//alert('synonms for: ' + this.state.value + '\nFunctionality not implemented');
			var REG = document.getElementById("returnReg");
			REG.innerHTML = "";
			//REG.append('<li>An element</li>');
			var url = 'https://wordsapiv1.p.mashape.com/words/' + this.state.value + '/' + TYPE;
			console.log(url);
			$.ajax({
				url: url,
				type: "GET",
				headers: {
					"X-Mashape-Key": "eWPyp4Sb8PmshOFdZAJKFbiI20NOp1oLR32jsnYjBkLwt5qmJg",
					"X-Mashape-Host": "wordsapiv1.p.mashape.com"
				},
				success: function (data) {
					alert("success")
					//console.log(data)
					//console.log(TYPE)
					//console.log(data.antonyms)	
					//console.log(data.antonyms.length)														
					if (TYPE == "synonyms"){
						//console.log("a")
						var arrayLength = data.synonyms.length;	
					}else{
						//console.log("b")
						var arrayLength = data.antonyms.length;	
					}
					for (var i = 0; i < arrayLength; i++) {
						var li = document.createElement("li");
						var lia = document.createElement("a");
						if (TYPE == "synonyms"){
							lia.appendChild(document.createTextNode(data.synonyms[i]));
							lia.value = data.synonyms[i];
						}else{
							lia.appendChild(document.createTextNode(data.antonyms[i]));
							lia.value = data.antonyms[i];
						}	
						lia.setAttribute("href", "#"); // added line
						lia.setAttribute("onClick", "{document.getElementById('thesinput').value = this.value}"); // added line						
						li.appendChild(lia);
						REG.appendChild(li);
						//document.getElementById('thesinput').innerHTML = this.value;
						//alert(myStringArray[i]);
						//this.handleChange;this.handleSubmit
						//Do something
					}
					console.log(data)
					//console.log(data.TYPE)
					//console.log(data.TYPE[0])
				},
			});
		}
		else {
			alert(TYPE + ' for: ' + this.state.value + ' from custom thesaurus\n Functionality not implemented');
		}
	}
	handleSourceChange(event) {
		this.setState({ source: event.target.value });
	}
	render() {
		return (
			<div className="bt">
				<h3>Thesaurus</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						Word:
		        		<input type="text" id="thesinput" className="form-control" value={this.state.value} onChange={this.handleChange} />
					</label>
					<div className="radio">
						<label className="radio-inline">
							<input type="radio" value="sourceStandard"
								checked={this.state.source === "sourceStandard"}
								onChange={this.handleSourceChange} />

							Standard Thesaurus
		        		</label>
						<label className="radio-inline">
							<input type="radio" value="sourceCustom"
								checked={this.state.source === "sourceCustom"}
								onChange={this.handleSourceChange} />
							Custom Thesaurus
		        		</label>
					</div>
					<label>
					<div className="form-group">
						<select className="form-control" id="sel1">
							<option>Synonyms</option>
							<option>Antonyms</option>
						</select>
					</div>
					</label>
					<input className="btn btn-primary" type="submit" value="Search" />
				</form>

				<ul id="returnReg" className="nav nav-pills">
				</ul>
			</div>
		);
	}
}

class AddCThesaurus extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '', value2: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}
	handleChange2(event) {
		this.setState({ value2: event.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		var TYPE = document.getElementById("sel2").value;		
		var ACTION = document.getElementById("sel3").value;
		alert(ACTION + ': ' + this.state.value2 + '\n' +TYPE +' of: ' + this.state.value + '\nFunctionality not implemented');
	}
	render() {
		//var TYPE = document.getElementById("sel2").value;		
		//var ACTION = document.getElementById("sel3").value;		
		return (
			<div className="bt">
				<h3>Edit Custom Thesaurus</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						<label id="cuslab1">Word:</label>
	        		<input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
					</label>
					<label>
						<label id="cuslab2">Synonym/Antonym:</label>
	        		<input type="text" className="form-control" value={this.state.value2} onChange={this.handleChange2} />
					</label>
					<br/>
					<label>
					<div className="form-group">
						<select className="form-control" id="sel2">
							<option>Synonym</option>
							<option>Antonym</option>
						</select>
					</div>
					</label>
					<label>
					<div className="form-group">
						<select className="form-control" id="sel3">
							<option>Add</option>
							<option>Remove</option>
						</select>
					</div>
					</label>
					<br/>
					
					<input className="btn btn-primary" type="submit" value="Submit" />
				</form>
				<ul className="dicResList">
				</ul>
			</div>
		);
	}
}

class WelcomePage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h1 className="cover-heading">Welcome to TSM Custom Thesaurus.</h1>
				<p className="lead">TSM Custom Thesaurus is a personalized, customizable thesaurus that builds upon the thesaurus from WordsAPI.</p>
				<p className="lead">
					<a onClick={this.handleRgClick} className="btn btn-lg btn-default">How does it work?</a>
				</p>
			</div>
		);
	}
}

class BaseFunction extends React.Component {
	constructor(props) {
		super(props);
		this.state = { job: 0 };
		this.handleHClick = this.handleHClick.bind(this);
		this.handleRgClick = this.handleRgClick.bind(this);
		this.handleCClick = this.handleCClick.bind(this);
		this.logout = props.logout.bind(this);
	}
	// logout() {
	// 	this.setState({ job: 3 });
	// 	var NAME = document.getElementById("home");
	// 	NAME.className="active";
	// 	var CUS = document.getElementById("cus");
	// 	CUS.classList.remove("active");
	// 	var THES = document.getElementById("thes");
	// 	THES.classList.remove("active");
	// 	console.log('Home');
	// }
	handleHClick() {
		this.setState({ job: 0 });
		var NAME = document.getElementById("home");
		NAME.className = "active";
		var CUS = document.getElementById("cus");
		CUS.classList.remove("active");
		var THES = document.getElementById("thes");
		THES.classList.remove("active");
		console.log('Home');
	}
	handleRgClick() {
		this.setState({ job: 1 });
		var NAME = document.getElementById("thes");
		NAME.className = "active";
		var HOME = document.getElementById("home");
		HOME.classList.remove("active");
		var CUS = document.getElementById("cus");
		CUS.classList.remove("active");
		console.log('Reg');
	}
	handleCClick() {
		this.setState({ job: 2 });
		var NAME = document.getElementById("cus");
		NAME.className = "active";
		var HOME = document.getElementById("home");
		HOME.classList.remove("active");
		var THES = document.getElementById("thes");
		THES.classList.remove("active");
		console.log('Cust');
	}

	render() {
		const job = this.state.job;
		let page = null;
		if (job == 0) {
			page = <WelcomePage />;
		}
		else if (job == 1) {
			page = <BaseThesaurus />;
		}
		else if (job == 2) {
			page = <AddCThesaurus />;

		} else {
			//log out function here
			page = <Login />;
		}
		return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">

					<div className="container">

						<div className="masthead clearfix">
							<div className="container inner">
								<h3 className="masthead-brand">TSM Custom Thesaurus</h3>
								<nav>
									<ul className="nav masthead-nav">
										<li id="home" className="active"><a href="#" onClick={this.handleHClick}>Home</a></li>
										<li id="cus"><a href="#" onClick={this.handleCClick}>Edit Custom Thesaurus</a></li>
										<li id="thes"><a href="#" onClick={this.handleRgClick}>Use Thesaurus</a></li>
										<li id="thes"><a href="#" onClick={this.logout}>Logout</a></li>
									</ul>
								</nav>
							</div>
						</div>

						<div className="inner cover">
							{page}
						</div>

					</div>

				</div>

			</div>
			//<div>
			//	{page}
			// 	<button type class="btn btn-primary" onClick={this.handleCClick} >
			//  		Edit Custom Thesaurus.
			//	</button>
			//	<button type class="btn btn-primary" onClick={this.handleRgClick} >
			// 		Use Thesaurus.
			//	</button>
			//</div>
		);
	}

}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { login: false, f2: props.f2 };

		this.login = props.login.bind(this);
		this.handleChange = props.change1.bind(this);
		this.handleChange2 = props.change2.bind(this);
		this.getf1 = props.f1.bind(this);
		this.getf2 = props.f2.bind(this);


	}
	render() {
		return (

			<div className="wrapper">
				<form className="form-signin" onSubmit={this.login}>
					<h2 className="form-signin-heading">Please login</h2>
					<input type="text" className="form-control" name="username" placeholder="Email Address" required="" autoFocus="" value={this.getf1()} onChange={this.handleChange} />
					<input type="password" className="form-control" name="password" placeholder="Password" required="" value={this.getf2()} onChange={this.handleChange2} />
					<input className="btn btn-lg btn-primary btn-block" type="submit" value="Submit" />
				</form>
			</div>
		);
	}

}

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { login: false, f1: '', f2: '' };

		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);

	}
	handleChange(event) {
		this.setState({ f1: event.target.value });
	}
	handleChange2(event) {
		this.setState({ f2: event.target.value });
	}
	login() {
		this.setState({ login: true });
		console.log(this.state.f1, this.state.f2);
	}
	logout() {
		this.setState({ login: false });
		console.log('logout');
		window.location.reload();
	}
	getf1() {
		return (this.state.f1);
	}
	getf2() {
		return (this.state.f1);
	}
	render() {
		let page = null;
		if (!this.state.login) {
			page = <Login change1={this.handleChange} change2={this.handleChange2} login={this.login} f1={this.getf1} f2={this.getf2} />;
		}
		else {
			page = <BaseFunction logout={this.logout} />;
		}
		return (
			<div>
				{page}
			</div>
		);
	}
}
// This asks ReactDOM to add the component SimpleWidget
// Note the JSX for specifiying a React component

ReactDOM.render(<MainPage />, document.getElementById('root'));
//ReactDOM.render(<Bottom />, document.getElementById('bottom'));