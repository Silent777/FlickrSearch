import React from "react";

const imageStyle = {
    maxHeight: '200px'
}

export class Image extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isBigImage: false
        };
    }

    showImage = (event) => {
        let activeItem = document.querySelector('.active')
        if (activeItem) {
            activeItem.classList.remove('active')
        }
        document.getElementById(event.target.id).classList.add('active')
        document.querySelector('.overlay').style.display = "block"
    }
    render() {
        return (
            <div>
                <img
                    onClick={this.showImage}
                    style={imageStyle}
                    src={this.props.url}
                    alt={this.props.title}
                    title={this.props.title}
                    id={this.props.id}
                />
            </div>
      );
    }
}