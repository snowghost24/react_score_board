var PLAYERS = [{
  name:"Jose Guzman",
  score:30,
  id:1
},{
  name:"Michael Jordan",
  score:27,
  id:2
},{
  name:"Lonzo Ball",
  score:15,
  id:3
}]


Header.propTypes = {
  title: React.PropTypes.string.isRequired
}
function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  )
}


Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired
}
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}  
      </div>
      <div className="player-score">
        <Counter/>
      </div>
    </div>
  )
}

var Counter = React.createClass({
  getInitialState:function(){
    return{
      score:0
    }
  },
  propTypes:{
  },
  render: function(){
    return(
      <div className="counter">
      <button className="counter-action decrement onClick={this.decrementScore}>-</button>
      <div className="counter-score">{this.state.score}</div>
      <button className="counter-action increment">+</button>
    </div> 
    )
  }
})




function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players">
      {props.players.map( function(player){
        return (
          <Player name={player.name} score={player.score} key={player.id}/>
        )
      })}
      </div>
    </div>
  )
}

Application.propTypes = {
  title: React.PropTypes.string.isRequired,
  players:React.PropTypes.arrayOf(React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  score:React.PropTypes.number.isRequired,
  id:React.PropTypes.number.isRequired
  })).isRequired,
}

ReactDOM.render(<Application title={"My scoreboard"} players={PLAYERS}/>, document.getElementById('container'));
