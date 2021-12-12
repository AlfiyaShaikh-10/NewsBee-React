import React from "react";

const NewsItem=(props)=> {
  
    let { title, desc, imgUrl, newsUrl, date, source } = props;
    return (
      <div>
        <div
          className="card"
          style={{ width: "fit-content", border: "1 solid black" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill  bg-dark"> {source} </span>
          </div>
          <img
            src={
              !imgUrl
                ? "https://images.hindustantimes.com/tech/img/2021/12/07/1600x900/HP_OMEN_16_1638861429374_1638861490100.jpg"
                : imgUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text">
              <small className="text-danger">
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem;
