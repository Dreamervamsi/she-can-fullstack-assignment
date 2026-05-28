import {app} from './app';
import './config/db';

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});