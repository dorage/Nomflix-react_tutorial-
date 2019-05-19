import React from 'react';
import TVPresenter from './TVPresenter';
import { tvApi } from '../../api';

export default class extends React.Component {
  state = {
    topRated: null,
    airingToday: null,
    popular: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated }
      } = await tvApi.topRated();
      const {
        data: { results: airingToday }
      } = await tvApi.airingToday();
      const {
        data: { results: popular }
      } = await tvApi.popular();
      this.setState({
        topRated,
        airingToday,
        popular
      });
    } catch (error) {
      this.setState({
        error: "Can't get movies information"
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { topRated, airingToday, popular, loading, error } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        airingToday={airingToday}
        popular={popular}
        loading={loading}
        error={error}
      />
    );
  }
}
