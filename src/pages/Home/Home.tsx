import { api } from "../../services/api";
import { useEffect } from "react";

function Home () {
    useEffect(() => {
        api.get("/")
        .then(res => console.log("BE response:", res.data))
        .catch(err => console.error("API error:", err));
    }, []);
    return (
        <div></div>
    )
}

export default Home