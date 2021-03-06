
import React from 'react/addons';
import Comment from './Comment';

const { CSSTransitionGroup } = React.addons;
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        
          <Comment author={comment.author} key={index}>
            {comment.text}
          </Comment>
        
      );
    });
    return (
      <div className="commentList">
      <CSSTransitionGroup transitionName="message-animation" >
        {commentNodes}
        </CSSTransitionGroup>
      </div>
    );
  }
});

export default CommentList;