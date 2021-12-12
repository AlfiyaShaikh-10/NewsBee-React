import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title=`${capitalizeFirstLetter( props.category)}-NewsMonkey`

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setTotalResults(parsedData.totalResults);
    setArticles(parsedData.articles);
  };

  const UpdateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    props.setProgress(100);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setArticles(parsedData.articles);
  };

  useEffect(() => {
    UpdateNews();
    // eslint-disable-next-line
  }, []);

//   const handlePrevClick = async () => {
//     setPage(page - 1);
//     UpdateNews();
//   };

//   const handleNextClick = async () => {
//     setPage(page + 1);
//     UpdateNews();
//   };

  return (
    <>
      <h1 className="text-center" style={{ margin: "90px,0px" }}>
        NewsMonkey - {capitalizeFirstLetter(props.category)}- Headlines
      </h1>
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        {" "}
        <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    desc={element.description ? element.description : ""}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  apiKey: "b0c674d525c449b3b8348c49d4df2e86",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
