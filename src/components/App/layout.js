import Navigation from "../Navigation";
import Footer from "../Footer";
import React, {Component} from 'react'

export default class Layout extends Component {
    render() {
        return (
            <div>
                <Navigation />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}