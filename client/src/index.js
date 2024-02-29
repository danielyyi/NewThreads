import reportWebVitals from './reportWebVitals';
import ApolloProvider from './ApolloProvider'

//updated for React 18
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(ApolloProvider);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

