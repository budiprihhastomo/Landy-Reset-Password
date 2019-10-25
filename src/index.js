import React from 'react';
import ReactDOM from 'react-dom';
import ResetScreen from './Screens/ResetPassword';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const MainNavigation = props => {
    return (
        <Router>
            <Switch>
                <Route path="/:id" children={<ResetScreen />} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(<MainNavigation />, document.getElementById('root'));
