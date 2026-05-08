import {useState} from "react";
import "./MainPage.css";

function MainPage() {

    const [searchData, setSearchData] = useState({
        origin: "",
        destination: "",
        departDate: "",
        returnDate: "",
        currency: "EUR",
    });

    const [result, setResult] = useState(null);
    const [message, setMessage] = useState("");


    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setMessage("");
        setResult(null);

        try {
            const params = new URLSearchParams({
                origin: searchData.origin,
                destination: searchData.destination,
                departDate: searchData.departDate,
                returnDate: searchData.returnDate,
                currency: searchData.currency,
            });

            const response = await fetch(`http://localhost:8080/api/flights/search?${params.toString()}`);
            if (!response.ok) {
                throw new Error("Search failed");
            }
            const data = await response.json();

            setResult(data);
        } catch (error) {
            console.error("Search error:", error);
            setMessage("Search failed. Please try again later.");
        }
    };

    return (
        <div className="main-page">
            <h1>Flight search</h1>

            <form onSubmit={handleSearch} className="flight-search-form">
                <input
                    type="text"
                    name="origin"
                    placeholder="From"
                    value={searchData.origin}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="destination"
                    placeholder="To"
                    value={searchData.destination}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="departDate"
                    value={searchData.departDate}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="returnDate"
                    value={searchData.returnDate}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="currency"
                    placeholder="Currency"
                    value={searchData.currency}
                    onChange={handleChange}
                />

                <button type="submit">Search flights</button>
            </form>

            {message && <p className="error-message">{message}</p>}

            {result && (
                <div className="result-card">
                    <h2>Search result</h2>
                    <p><strong>Success:</strong> {String(result.success)}</p>
                    <p><strong>Currency:</strong> {result.currency}</p>

                    <div className="result-data">
                        <h3>Data</h3>
                        <pre>{JSON.stringify(result.data, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainPage;