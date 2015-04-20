/** jsx React.DOM */
var SayHello=React.createClass({
  handleNameSubmit:function(name){
    this.setProps({data:name});
  },
  render:function(){
    return (
      <div>
        <UserName onNameSubmit={this.handleNameSubmit}/>
        <HelloText data={this.props.data}/>
      </div>
    );
  }
});
var UserName=React.createClass({
  handleChange:function(){
    var username=this.refs.username.getDOMNode().value.trim();
    this.props.onNameSubmit({username:username});
    //this.refs.username.getDOMNode().value='';
    return false;
  },
  render:function(){
    return (
      <form role="form" onChange={this.handleChange}>
        <div className="input-group input-group-lg">
          <h3>Input here:</h3>
          <textarea type="text" className="form-control col-md-8" placeholder="Type Your Name" ref="username"/>
        </div>
      </form>
    );
  }
});
var HelloText=React.createClass({
  render:function(){
    return(
      <div>
        <h3>Output here: </h3>
        <pre>{this.props.data}</pre>
      </div>
    );
  }
});
React.render(
  <SayHello data="data"/>,
  document.getElementById('mark')
);

