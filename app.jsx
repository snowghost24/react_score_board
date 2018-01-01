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


Header.propTypes = {
  title: React.PropTypes.string.isRequired
}
function Header(props) {
  return (
    <div className="header">
    <Stats />
      <h1>{props.title}</h1>
    </div>
  )
}


Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired
}
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  )
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
Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}

function Stats(props) {
  var totalPlayers = props.players.lenght;
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>
            Players:
        </td>
          <td>
          totalPlayers
        </td>
        </tr>
        <tr>
          <td>Total Points</td>
          <td>123</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired
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
  render: function () {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} />
        <div className="players">
          {this.props.initialPlayers.map(function (player, index) {
            return (
              <Player
                onScoreChange={function (delta) { this.onScoreChange(index, delta) }.bind(this)}
                name={player.name}
                score={player.score}
                key={player.id} />
            )
          }.bind(this))}
        </div>
      </div>
    )
  }
})





ReactDOM.render(<Application title={"My scoreboard"} initialPlayers={PLAYERS} />, document.getElementById('container'));