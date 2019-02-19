import React, { Component } from "react";
import { connect } from "react-redux";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postings: this.props.posts[0].company_1,
      lastPosting: null,
      showPostingForm: false,
      selectedOption: Object.keys(this.props.posts[0])[0]
    };
  }

  renderHeader() {
    return (
      <div className="header">
        <div className="header-doc-type">Document Types</div>
        <div className="header-comment">Comments</div>
        <div className="header-action">Action</div>
      </div>
    );
  }

  showPostingForm() {
    this.setState({ showPostingForm: true });
  }

  updatePostingList() {
    let postings = Object.assign([], this.state.postings);
    const newId = postings.length + 1;
    postings.push({
      id: newId,
      documentType: this.refs.doc.value,
      comment: this.refs.comment.value
    });
    this.setState({ postings: postings, showPostingForm: false });
  }

  renderCreatePostingbutton() {
    return !this.state.showPostingForm ? (
      <span className="button" onClick={this.showPostingForm.bind(this)}>
        Create Posting
      </span>
    ) : (
      <div className="posting-form">
        <div className="posting-doc">
          <label>Document Type</label>
          <input type="text" ref="doc" />
        </div>
        <div className="posting-comment">
          <label>Comment</label>
          <input type="text" ref="comment" />
        </div>
        <div className="posting-button">
          <span className="button" onClick={this.updatePostingList.bind(this)}>
            Create
          </span>
        </div>
      </div>
    );
  }

  renderOptionForCompany() {
    return this.props.posts.map(function(user, index) {
      return (
        <option key={index} value={Object.keys(user)[0]}>
          {Object.keys(user)[0]}
        </option>
      );
    });
  }

  filterMe(event) {
    const term = event.target.value.trim();
    let postings = Object.assign([], this.state.postings);
    let newPosting = [];
    if (term && term.length >= 2) {
      this.timeout = setTimeout(() => {
        postings.filter(function(posting) {
          if (posting.documentType === term) {
            newPosting.push(posting);
          }
        });
        this.setState({ postings: newPosting });
      }, 100);
    } else {
      this.setState({
        postings:
          this.state.selectedOption === "company_2"
            ? this.props.posts[1][this.state.selectedOption]
            : this.props.posts[0][this.state.selectedOption]
      });
    }
  }

  selectCurrentCompany(e) {
    const selectedValue = e.target.value;
    this.setState({ selectedOption: selectedValue });
    let newCompany = {};
    this.props.posts.forEach(function(company) {
      if (company && Object.keys(company)[0] == e.target.value) {
        newCompany = company[Object.keys(company)[0]];
      }
    });
    this.setState({ postings: newCompany });
  }

  renderFilterAndSearch() {
    return (
      <div className="filter">
        <select
          className="filter-select"
          value={this.state.selectedOption}
          onChange={this.selectCurrentCompany.bind(this)}
        >
          <option value="">Select Company</option>
          {this.renderOptionForCompany()}
        </select>
        <input
          type="text"
          className="filter-search"
          name="comments"
          placeholder="Search"
          onChange={this.filterMe.bind(this)}
        />
      </div>
    );
  }

  renderResendButton() {}

  renderList() {
    return this.state.postings.map(user => {
      return (
        <div className="content-body" key={user.id}>
          <div className="content-doc">{user.documentType}</div>
          <div className="content-comment">{user.comment}</div>
          <div className="content-action">
            <span className="button">Resend</span>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderFilterAndSearch()}
        {this.renderHeader()}
        {this.renderList()}
        <hr />
        {this.renderCreatePostingbutton()}
      </div>
    );
  }
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps)(PostList);
