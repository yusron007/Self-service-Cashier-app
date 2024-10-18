import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Dashboard from "./pages/Dashboard.jsx";
import Shopping from "./pages/Shopping.jsx";
import CustomerProfile from "./pages/CustomerProfile.jsx";
import ShoppingPage from "./pages/ShoppingPage.jsx"
import DataPage from "./pages/DataPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

export default function App() {
    return (
        <ApolloProvider client={client}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/shopping-page" element={<ShoppingPage />} />
                <Route path="/shopping" element={<Shopping />} />
                <Route path="/customer" element={<CustomerProfile />} />
                <Route path="/data" element={<DataPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </BrowserRouter>
        </ApolloProvider>
    )
}