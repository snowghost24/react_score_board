var PLAYERS = [{
  name: "Jose Guzman",
  score: 30,
  id: 1
}, {
  name: "Michael Jordan",
  score: 27,
  id: 2
}, {
  name: "Lonzo Ball",
  score: 15,
  id: 3
}]

var nextId = 4;

Header.propTypes = {
  title:React.PropTypes.string.isRequired,
  players:React.PropTypes.array.isRequired
}
function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>{props.title}</h1>
    </div>
  )
}


Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove:React.PropTypes.func.isRequired
}
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
      <a className="remove-player" onClick={props.onRemove}>x</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  )
}


Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}
function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function () {
        props.onChange(-1);
      }} >-</button>
      <div className="counter-score">{props.score}</div>
      <button className="counter-action increment" onClick={function () {
        props.onChange(1);
      }} >+</button>
    </div>
  )
}

var AddPlayerForm = React.createClass({
  propTypes:{
    // onAdd:React.PropTypes.func.isRequired
  },
  getInitialState:function (){
    return { 
      name:"",
    }
  },
  onNameChange:function(e){
    this.setState({
      name: e.target.value
    })
  },
  onSubmit:function(e){
    //prevents page from reloading on submit
    e.preventDefault()
    //sending onAdd up to parent as callback
    this.props.onAdd(this.state.name);
    //empties the field after submit
    this.setState({name:""})
  },
  render:function(){
    return (
      <div className="add-player-form"> 
      <form action="" onSubmit={this.onSubmit}>
      <input type="text" value={this.state.name} onChange={this.onNameChange}/>
      <input type="submit" value="add player"/>
      </form>
      </div>
    )
  }
})


Stats.propTypes = {
  players: React.PropTypes.array.isRequired
}
function Stats(props) {
  var totalPlayers =props.players.length
  //itirates through the array and adds each score to total
var totalPoints = props.players.reduce(function(total,player){
  return total + player.score
},0)
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Score</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}






var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired
    })).isRequired,
  },
  getInitialState: function () {
    return {
      players: this.props.initialPlayers
    };
  },
  onScoreChange: function (index, delta) {
    console.log(index, delta)
    this.state.players[index].score += delta;
    this.setState(this.state)
  },
  getDefaultProp: function () {
    title: "Scoreboard"
  },
  onPlayerAdd:function(name){
    console.log('player added:',name);
    //push the name into the players array
    this.state.players.push({
      name:name,
      score:0,
      id: nextId
    });
    this.setState(this.state);
    // everytime the onPlayerAdd function is call the id number is increased
    nextId+=1;
  },
  onRemovePlayer:function(index){
    console.log(index)
    this.state.players.splice(index,1);
    //rerenders the state on the callback from child
    this.setState(this.state)

  },
  render: function () {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players}/>
        <div className="players">
          {this.props.initialPlayers.map(function (player, index) {
            return (
              <Player
                onScoreChange={function (delta) { this.onScoreChange(index, delta) }.bind(this)}
                name={player.name}
                //use bind this when you are using a unanimous function
                onRemove={function(){this.onRemovePlayer(index)}.bind(this)}
                score={player.score}
                key={player.id} />
            )
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
      </div>
    )
  }
})





ReactDOM.render(<Application title={"My scoreboard"} initialPlayers={PLAYERS} />, document.getElementById('container'));