import React from 'react'
import {Row,Col, Container} from 'react-bootstrap'
import '../../App.css'

const Home = () => {
  return (
    <div className="jumbotron">
      <header className="container">
       <h1>Home Page</h1>
      </header>
      <div className="container">
        <p>NOTE: The key pieces of CSS have comments next to them.</p>
        <h2>Bacon Ipsum</h2>
        <p>Bacon ipsum dolor sit amet bresaola shoulder ribeye jerky tongue andouille kevin meatloaf fatback shank bacon turkey turducken spare ribs chuck. Porchetta prosciutto pork chop, jowl andouille tri-tip rump kielbasa. Capicola ground round cow, drumstick shankle turducken pastrami. Flank bresaola meatball doner short ribs beef ribs ham hock pancetta. Prosciutto chuck andouille, spare ribs pork loin turkey jowl pastrami landjaeger corned beef doner tail strip steak. Brisket rump shank, doner pork chop leberkas turducken tri-tip ribeye shoulder spare ribs.</p>
      </div>
    </div>
  )
}

export default Home
