const config = {
    URL: "http://localhost:5050/",
    access_token:'access_token',
    refresh_token: 'refresh_token',
    axios_config: {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            // "Access-Control-Allow-Origin": "*"
        }
    }
}
export default config;
