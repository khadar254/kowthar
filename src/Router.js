import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './pages/404'
import Home from './pages/Home'
import Login from './pages/Login'

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='*' component={NotFound} />
            </Switch>
        </Router>
    )
}

export default AppRouter
