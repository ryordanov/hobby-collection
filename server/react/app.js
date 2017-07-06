import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'


import Home from './components/Home';
import About from './components/About';
import Collections from './components/Collections';
import CollectionDetails from './components/CollectionDetails';
import SubCollection from './components/SubCollection';
import ListItems from './components/ListItems';
import ItemInfo from './components/ItemInfo';
import NotFound from './components/NotFound';


// const Items = () => (
//     <Switch>
//         <Route exact path='/items' component={ListItems} />
//         <Route path='/items/:number' component={ItemInfo} />
//     </Switch>
// )

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/collections' component={Collections} />
            <Route exact path='/collection/:name' component={CollectionDetails} />
            <Route path='/collection/:name/:subcollectionname' component={SubCollection} />
            {/*<Route path='/items' component={Items} />*/}
            <Route path='/about' component={About} />
            <Route component={NotFound} />
        </Switch>
    </main>
)

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/collections'>Collections</Link></li>
                {/*<li><Link to='/items'>Items</Link></li>*/}
                <li><Link to='/about'>About</Link></li>
            </ul>
        </nav>
    </header>
)

const Footer = () => (
    <footer>
        <nav>
            <ul>
                <li><Link to='/'>Copyrights</Link></li>
            </ul>
        </nav>
    </footer>
)

const App = () => (
    <div>
        <Header />
        <Main />
        <Footer />
    </div>
)

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));


// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf


/*
// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const PlayerAPI = {
    players: [
        { number: 1, name: "Ben Blocker", position: "G" },
        { number: 2, name: "Dave Defender", position: "D" },
        { number: 3, name: "Sam Sweeper", position: "D" },
        { number: 4, name: "Matt Midfielder", position: "M" },
        { number: 5, name: "William Winger", position: "M" },
        { number: 6, name: "Fillipe Forward", position: "F" }
    ],
    all: function() { return this.players },
    get: function(id) {
        const isPlayer = p => p.number === id
        return this.players.find(isPlayer)
    }
}

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullRoster = () => (
    <div>
        <ul>
            {
                PlayerAPI.all().map(p => (
                    <li key={p.number}>
                        <Link to={`/roster/${p.number}`}>{p.name}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
)

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const Player = (props) => {
    const player = PlayerAPI.get(
        parseInt(props.match.params.number, 10)
    )
    if (!player) {
        return <div>Sorry, but the player was not found</div>
    }
    return (
        <div>
            <h1>{player.name} (#{player.number})</h1>
            <h2>Position: {player.position}</h2>
            <Link to='/roster'>Back</Link>
        </div>
    )
}
*/