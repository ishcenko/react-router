import { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledForm } from './styled';

export default class BookForm extends Component {
  state = {
    title: '',
    author: '',
    year: '',
    genre: '',
    favourite: false,
    cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
  };

  handleInputChenge = event => {
    // console.log('event: ', event.target.name);

    if (event.target.type === 'checkbox') {
      this.setState({
        [event.target.name]: event.target.checked,
      });
      return;
    }

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const bookData = {
      title: this.state.title,
      author: this.state.author,
      year: Number.parseInt(this.state.year),
      genre: this.state.genre,
      favourite: this.state.favourite,
      cover: this.state.cover,
    };
    this.props.onAddBook(bookData);
    // console.log(bookData);
    this.setState({
      title: '',
      author: '',
      year: '',
      genre: '',
      favourite: false,
      cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
    });
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h2>{this.props.title}</h2>
        <label className="form-label">
          <span>title:</span>
          <input
            onChange={this.handleInputChenge}
            value={this.state.title}
            name="title"
            type="text"
            required
          />
        </label>
        <label className="form-label">
          <span>author:</span>
          <input
            onChange={this.handleInputChenge}
            value={this.state.author}
            name="author"
            type="text"
            required
          />
        </label>
        <label className="form-label">
          <span>year:</span>
          <input
            onChange={this.handleInputChenge}
            value={this.state.year}
            name="year"
            type="text"
            required
          />
        </label>
        <label className="form-label">
          <span>genre:</span>
          <input
            onChange={this.handleInputChenge}
            value={this.state.genre}
            name="genre"
            type="text"
            required
          />
        </label>
        <label className="form-label">
          <span>favourite:</span>
          <input
            onChange={this.handleInputChenge}
            checked={this.state.favourite}
            name="favourite"
            type="checkbox"
          />
        </label>

        <button type="submit">Add book</button>
      </StyledForm>
    );
  }
}
BookForm.propTypes = {
  title: PropTypes.string.isRequired,
  onAddBook: PropTypes.func.isRequired,
};
