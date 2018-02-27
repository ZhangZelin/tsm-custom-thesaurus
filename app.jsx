
class BaseThesaurus extends React.Component {
	constructor(props){
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		this.setState({value: event.target.value});
	}
	handleSubmit(event){
		alert('synonms for ' + this.state.value);
	}
  	render() {
	    return (
      		<div className="bt">
		        <h3>Thesaurus</h3>
		        <form onSubmit={this.handleSubmit}>
		        	<label>
		        		Word:
		        		<input type="text" value={this.state.value} onChange={this.handleChange}/>
	        		</label>
	        		<input type="submit" value="Submit" />
		        </form>
		        <ul className="dicResList">
		        </ul>
      		</div>
	    )
	}
}
class Bottom extends React.Component {
	constructor(props){
		super(props);
		this.state = {job: 1};
		this.handleRgClick = this.handleRgClick.bind(this);
		this.handleCClick = this.handleCClick.bind(this);

	}
	handleRgClick(){
		this.setState({job : 1});
		console.log('Reg');
		ReactDOM.render(<BaseThesaurus />, document.getElementById('root'));
	}
	handleCClick(){
		this.setState({job : 2});
		console.log('Cust');
		ReactDOM.render(<AddCThesaurus />, document.getElementById('root'));
	}
	render(){
		return(
			<div className="change">
		      	<form onSubmit={this.handleCClick} >
		      		<input type="submit" value="Custom Th." />
	      		</form>
      			<form onSubmit={this.handleRgClick} >
		      		<input type="submit" value="Reg Th." />
	      		</form>
	      		
			</div>
		)
	}
}
class AddCThesaurus extends React.Component {
	constructor(props){
		super(props);
		this.state = {value: '', value2: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		this.setState({value: event.target.value});
	}
	handleChange2(event){
		this.setState({value2: event.target.value});
	}
	handleSubmit(event){
		alert('Added ' + this.state.value2 + 'as synonm for ' + this.state.value);
	}
  	render() {
	    return (
	      <div className="bt">
	        <h3>Add to Custom Thesaurus</h3>
	        <form onSubmit={this.handleSubmit}>
	        	<label>
	        		Word:
	        		<input type="text" value={this.state.value} onChange={this.handleChange}/>
        		</label>
        		<label>
	        		Synonm:
	        		<input type="text" value={this.state.value2} onChange={this.handleChange2}/>
        		</label>
        		<input type="submit" value="Submit" />
	        </form>
	        <ul class="dicResList">
	        </ul>
	      </div>
	    )
	}
}
// This asks ReactDOM to add the component SimpleWidget
// Note the JSX for specifiying a React component

ReactDOM.render(<BaseThesaurus />, document.getElementById('root'));
ReactDOM.render(<Bottom />, document.getElementById('bottom'));