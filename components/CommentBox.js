
import React from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    this.socket.emit('comment', comment);
  },
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function (){
      this.socket = io('http://localhost:3000');
      this.socket.on('comment', (comment) =>{
          //console.log('llego un nuevo coment');
          var comments = this.state.data;
          var newComments = comments.concat([comment]);
          this.setState({data: newComments});
      })  
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

export default CommentBox;