import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoutes'
import NotFound from './pages/404'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <Route exact path='*' component={NotFound} />
            </Switch>
        </Router>
    )
}

export default AppRouter
