import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from '../../api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes('movie')
    };
  }

  async componentDidMount() {
    const {
      history: { push },
      match: {
        params: { id }
      }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = Number(id, 10);
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = 'null';
    try {
      if (isMovie === true) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
      this.setState({
        result
      });
    } catch (error) {
      this.setState({ error: "Can't find anything" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { result, isMovie, error, loading } = this.state;
    return (
      <DetailPresenter
        result={result}
        isMovie={isMovie}
        error={error}
        loading={loading}
      />
    );
  }
}
