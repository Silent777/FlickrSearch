import React from "react";
import { imageSearchGet } from "./imageSearchService";
import { Image } from "./image"

const inputStyle = {
    display: 'flex',
    margin: '20px auto',
    width: '500px',
    border: 'none',
    borderRadius: '2em',
    paddingLeft: '1.25em',
    fontSize: '0.95em',
    height: '2.5em',
    boxShadow: '0 0px 20px 0 rgba(0, 0, 0, 0.1), 0 0px 30px 0 rgba(0, 0, 0, 0.1)',
    outline: 'none'
}

const showMoreButtonStyle = {
    display: 'block',
    padding: '15px 25px',
    fontSize: '24px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    outline: 'none',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '15px',
    boxShadow: '0 9px #999',
    margin: '30px auto'
}

const imageContanerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
}

export class ImageSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        photos: [],
        query: '',
        page: 1,
        pages: 0
    };
  }

  getImages (query) {
    imageSearchGet(query)
    .then(response =>{
      this.setState({
        query: query,
        photos: response.data.photos.photo,
        page: response.data.photos.page,
        pages: response.data.photos.pages
      })}
    )
    .catch(error => {
      console.log("Error fetching and parsing data", error);
    });
  } 

  search = (event) => {
          if(event.keyCode === 13) {
              event.target.value ? 
                  this.getImages(event.target.value) : 
                  this.setState({query: ''})
              }
          if(!event.target.value) {
            this.setState({
                photos: [],
                query: ''
            })
          }
  }

  handleShowMore = () => {
      imageSearchGet(this.state.query, this.state.page + 1)
        .then(response => {
            this.setState({
                photos: this.state.photos.concat(response.data.photos.photo),
                page: this.state.page + 1,
                pages: response.data.photos.pages
            })
        })
  }


  render() {
      let showMoreButton
      if(this.state.query && this.state.page < this.state.pages) {
            showMoreButton = <button
                onClick={this.handleShowMore}
                style={showMoreButtonStyle}
                className="showMoreButton" >
                    Show more
            </button>
      }
        return (
          <div>
            <div className='overlay'></div>
            <input type="text" placeholder='Search' onKeyUp={this.search} style={inputStyle} />

            <div style={imageContanerStyle}>
                {this.state.photos.map(photo =>
                    <Image
                        url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                        key={photo.id}
                        id={photo.id}
                        title={photo.title} />
                )}
             </div>
                {showMoreButton}
          </div>
        );
  }
}
