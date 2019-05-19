/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import ReactPlayer from 'react-player';
import Loader from '../../Components/Loader';
import FlagIcon from '../../Components/FlagIcon';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 50px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const IMDB = styled.a`
  display: inline-block;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  width: 25px;
  height: 12px;
`;
const Homepage = styled.a`
  display: inline-block;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  width: 13px;
  height: 13px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 100px;
`;

const Tab = styled.div`
  width: 60%;
  height: calc(50vh - 50px);
  background-color: rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
`;

const TabHeader = styled.div`
  height: 50px;
  padding: 10px;
`;
const HeadList = styled.ul`
  display: flex;
`;
const HeadItem = styled.li`
  position: relative;
  top: -50px;
  color: white;
  height: 50px;
  padding: 10px;
  text-align: center;
  font-size: 20px;
`;

const TabBody = styled.div`
  padding-left: 50px;
`;

const DetailPresenter = ({ result, isMovie, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Detail | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>{`${
          result.title
            ? `${
                result.title.length > 12
                  ? `${result.title.substring(0, 12)}..`
                  : result.title
              }`
            : `${
                result.name.length > 12
                  ? `${result.name.substring(0, 12)}..`
                  : result.name
              }`
        } | Nomflix`}</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require(`../../Assets/noPosterSmall.png`)
          }
        />
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemContainer>
            <Item
              className={`flag-icon flag-icon-${
                result.production_countries
                  ? result.production_countries[0].iso_3166_1.toLowerCase()
                  : result.origin_country[0].toLowerCase()
              }`}
            />
            <Divider>·</Divider>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {isMovie
                ? `${result.runtime} 분`
                : `${result.number_of_seasons} 시즌 ${
                    result.number_of_episodes
                  } 화`}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index + 1 === result.genres.length
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>·</Divider>
            {isMovie ? (
              <IMDB
                target="_blank"
                bgImage={require('../../Assets/imdb-logo.png')}
                href={`https://www.imdb.com/title/${result.imdb_id}`}
              />
            ) : (
              <Homepage
                target="_blank"
                bgImage={require('../../Assets/homepage-icon.png')}
                href={result.homepage}
              />
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Tab>
            {isMovie ? (
              <>
                <TabHeader>
                  <HeadList>
                    <HeadItem>Trailer</HeadItem>
                    <HeadItem>Company</HeadItem>
                    <HeadItem>Collections</HeadItem>
                  </HeadList>
                </TabHeader>
              </>
            ) : (
              <>
                <TabHeader>
                  <HeadList>
                    <HeadItem>Trailer</HeadItem>
                    <HeadItem>Company</HeadItem>
                    <HeadItem>CreatedBy</HeadItem>
                    <HeadItem>Seasons</HeadItem>
                  </HeadList>
                </TabHeader>
              </>
            )}
            <TabBody />
          </Tab>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  isMovie: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
