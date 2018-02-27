
class BaseThesaurus extends React.Component {
	constructor(props){
		super(props);
		this.state = {value: '', source: 'sourceStandard'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSourceChange = this.handleSourceChange.bind(this);
	}
	handleChange(event){
		this.setState({value: event.target.value});
	}
	handleSubmit(event){
		event.preventDefault();
		if(this.state.source==="sourceStandard"){
			alert('synonms for: ' + this.state.value + '\nFunctionality not implemented');
		}
		else{
			alert('synonms for: ' + this.state.value + ' from custom thesaurus\n Functionality not implemented');
		}
	}
	handleSourceChange(event){
		this.setState({source: event.target.value});
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
	        		<div className="radio">
		        		<label>
		        			<input type="radio" value="sourceStandard" 
		        				checked={this.state.source==="sourceStandard"} 
		        				onChange={this.handleSourceChange}/>

		        			Standard Thesaurus
		        		</label>
		        		<label>
		        			<input type="radio" value="sourceCustom" 
		        				checked={this.state.source==="sourceCustom"} 
		        				onChange={this.handleSourceChange}/>
		        			Custom Thesaurus
		        		</label>
		        	</div>
	        		<input type="submit" value="Submit" />
		        </form>
		        
		        <ul className="dicResList">
		        </ul>
      		</div>
	    );
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
		event.preventDefault();
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
	        <ul className="dicResList">
	        </ul>
	      </div>
	    );
	}
}
class Base extends React.Component{
	constructor(props){
		super(props);
		this.state = {job: 1};
		this.handleRgClick = this.handleRgClick.bind(this);
		this.handleCClick = this.handleCClick.bind(this);

	}
	handleRgClick(){
		this.setState({job: 1});
		console.log('Reg');
	}
	handleCClick(){
		this.setState({job: 2});
		console.log('Cust');
	}

	render() {
		const job = this.state.job;
		let page = null;
		if(job == 1){
			page = <BaseThesaurus />;
		}
		else{
			page = <AddCThesaurus />;

		}
		return(
			
			<div>
				{page}
		      	<button onClick={this.handleCClick} >
		      		Custom Th.
	      		</button>
      			<button onClick={this.handleRgClick} >
		      		Reg Th.
	      		</button>
	      		
			</div>
		);
	}

}
// This asks ReactDOM to add the component SimpleWidget
// Note the JSX for specifiying a React component

ReactDOM.render(<Base />, document.getElementById('root'));
//ReactDOM.render(<Bottom />, document.getElementById('bottom'));