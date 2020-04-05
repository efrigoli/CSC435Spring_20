/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 03/21/20
 * Last Modified: 03/22/20 - Added Comments
 *                03/28/20 - Changed Footer component from function to class
 *                         - Added Contact information
 */

// Importing dependencies
import React from "react";

/* Creating the Footer component to render the footer using the prop data from index.js
and separating arrays into lists with keys */
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div class="container">
          <div className="contactInfo">
            <h3>Call Us:</h3>
            <p>{this.props.contactData.phone}</p>
          </div>
          <div className="contactInfo">
            <h3>Email Us:</h3>
            <ul>{this.props.contactData.emailAddresses.map((email, i) => <li key={i}>{email}</li>)}</ul>
          </div>
          <div className="contactInfo">
            <h3>Visit Us:</h3>
            <p>{this.props.contactData.street}
              <br />{this.props.contactData.city}, {this.props.contactData.state}
              <br />{this.props.contactData.zip}
            </p>
          </div>
          <div className="copyrightInfo">
            <p>All images are from <a href="https://unsplash.com/" target="_blank">Unsplash</a> and are freely licensed for both commercial and non-commercial use.</p>
            <p>&copy;{new Date().getFullYear()} Elise Frigoli</p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
