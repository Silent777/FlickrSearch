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
        let overlay = document.querySelector('.overlay')
            overlay.style.display = 'block'
            overlay.addEventListener('click', this.hideImage)
        document.getElementById(event.target.id).classList.add('active')

    }

    hideImage = () => {
        let activeItem = document.querySelector('.active')
        if (activeItem) {
            activeItem.classList.remove('active')
        }
        document.querySelector('.overlay').style.display = 'none'
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