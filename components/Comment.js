
import React from 'react';
import marked from 'react-marked';

var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children.toString()}
      </div>
    );
  }
});

export default Comment;