function Header (props){
  return(
    <div className="header">
    <h1>{props.title}</h1>
  </div>
  )
}

Header.propTypes ={
  title:React.PropTypes.string.isRequired
  }


function Application(props) {
  return (
    <div className="scoreboard">
     <Header title={props.title}/>
      <div className="players">
        <div className="player">
          <div className="player-name">
            Jose Guzman
        </div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement">-</button>
              <div className="counter-score">31</div>
              <button className="counter-action increment">+</button>
            </div>
          </div>
        </div>
        <div className="player">
          <div className="player-name">
            Michael Jordan
        </div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement">-</button>
              <div className="counter-score">31</div>
              <button className="counter-action increment">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Application.propTypes ={
title:React.PropTypes.string.isRequired
}

ReactDOM.render(<Application title={"My scoreboard"} />, document.getElementById('container'));