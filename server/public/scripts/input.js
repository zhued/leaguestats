/****
Basic structure of react:
- MainBox
  - SubmitList
    - Data
  - SubmitForm
****/


var converter = new Showdown.converter();


var MainBox = React.createClass({
  // loadCommentsFromServer: function() {
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     success: function(data) {
  //       this.setState({data: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  handleDataSubmit: function(data_req) {
    var data_list= this.state.data;
    data_list.push(data_req);
    this.setState({data: data_list}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: data_req,
        success: function(data) {
          this.setState({data: data_req});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  // componentDidMount: function() {
  //   this.loadCommentsFromServer();
  //   setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  // },
  render: function() {
    return (
      <div className="mainBox">
        <h1>leaguestats</h1>
        <SubmitList data={this.state.data} />
        <SubmitForm onCommentSubmit={this.handleDataSubmit} />
      </div>
    );
  }
});


// ***
// Takes in data and summoner
// ***
var SubmitList = React.createClass({
  render: function() {
    var dataNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Data summoner={comment.summoner} stat={comment.stat} key={index}>
          {comment.data_api}
        </Data>
      );
    });
    return (
      <div className="SubmitList">
        {dataNodes}
      </div>
    );
  }
});

// ***
// This will put the summoner name and data wanted as header 2
// ***
var Data = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="summonerName">
          {this.props.summoner} ---- {this.props.stat}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

// ***
// Handle on submit button
// 
//  I COULD PUT API RIGHT HERE OR MAKE A NEW VAR
// ***
var SubmitForm = React.createClass({
  getStatsfromAPI: function(request) {
    var api_url = "".concat(request.summoner,"/",request.stat);
    $.ajax({
      url: api_url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    return this.state.data;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var summoner = this.refs.summoner.getDOMNode().value.trim();
    var stat = this.refs.stat.getDOMNode().value.trim();
    if (!stat || !summoner) {
      return;
    }
    // GETTING API DATA
    var data_api=this.getStatsfromAPI({summoner: summoner, stat: stat});

    this.props.onCommentSubmit({summoner: summoner, stat: stat, data_api: data_api});
    this.refs.summoner.getDOMNode().value = '';
    this.refs.stat.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form className="SumbitForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Summoner Name" ref="summoner" />
        <input type="text" placeholder="Stat wanted.." ref="stat" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

React.render(
  // <MainBox url="comments.json" pollInterval={2000} />,
  React.createElement(MainBox, null),
  document.getElementById('content')
);
