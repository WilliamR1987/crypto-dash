import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';

// This page will host the functionality to display coins filtered by name and or symbol and sorted by options shown in the select list
const HomePage = ({coins, filter, setFilter, limit, setLimit, sortBy, setSortBy, loading, error  }) => {

    const filteredCoins = coins //coins is an array of many coins
    .filter((coin) => { //filter the coins and include only those matching the inputted filter.  Eg: 'Bit' matches Bitcoin, 'B' matches Bitcoin and BNB
        return (
        // set name & symbol & filter to lower case to insure that comparisons are case insensitive
        // filer refers to what the user typed in. In our case, we are comparing lower case name to lower case filter.  Same for symbol.
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
        );
    })
    .sort((a, b) => {
        switch (sortBy) {
        case 'market_cap_desc':
            return b.market_cap - a.market_cap;
        case 'market_cap_asc':
            return a.market_cap - b.market_cap;
        case 'price_desc':
            return b.current_price - a.current_price;
        case 'price_asc':
            return a.current_price - b.current_price;
        case 'change_desc':
            return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
            return a.price_change_percentage_24h - b.price_change_percentage_24h;
        }
    });

return (  
    <div>
        <h1> 🚀 Crypto Dash</h1>
        {loading && <p>Loading...</p>} {/* loading = true by default; if there was an error or no error, setLoading would have been set to false in the useEffect by the finally block */}
        {error && <div className='error'>{error}</div>} {/* if error is falsy left hand side is not executed, else if error is truthy, the right hand side display the error message */}
        <div className='top-controls'> {/* set the number of coins, filter and sort as desired  */}
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {!loading && !error && (
        <main className='grid'>
            {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
            ) : (
            <p>(No matching coins)</p>
            )}
        </main>
        )}
    </div>
    );
}
 
export default HomePage;