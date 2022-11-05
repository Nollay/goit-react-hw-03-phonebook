import React, { Component } from 'react';

export default class Filter extends Component {
  handleFilter = e => {
    this.props.onFilter(e.currentTarget.value);
  };
  render() {
    const { filter } = this.props;
    return (
      <div>
        Find contact by name
        <form action="">
          <label htmlFor="">
            <input
              type="text"
              name="filter"
              value={filter}
              onChange={this.handleFilter}
            />
          </label>
        </form>
      </div>
    );
  }
}
