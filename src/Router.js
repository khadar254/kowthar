import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoutes'
import NotFound from './pages/404'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import User from './pages/Users'
import Inventory from './pages/Inventory'
import Product from './pages/Products'
import Customers from './pages/Customers'
import Sales from './pages/Sales'
import SalesDetails from './pages/SalesDetails'
import Receipt from './pages/Receipt'

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/users' component={User} />
                <PrivateRoute exact path='/inventory' component={Inventory} />
                <PrivateRoute exact path='/products' component={Product} />
                <PrivateRoute exact path='/customers' component={Customers} />
                <PrivateRoute exact path='/sales' component={Sales} />
                <PrivateRoute
                    exact
                    path='/sale/:name'
                    component={SalesDetails}
                />
                <PrivateRoute exact path='/receipt/:name' component={Receipt} />
                <Route exact path='*' component={NotFound} />
            </Switch>
        </Router>
    )
}

export default AppRouter
