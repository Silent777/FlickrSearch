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
        query: ''
    };
  }

  getImages (query) {
    imageSearchGet(query)
    .then(response =>{
        console.log(response)
      this.setState({
        query: query,
        photos: response.data.photos.photo,
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
            this.setState({photos: []})
          }
  }

  render() {
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
          </div>
        );
  }
}
