const configServer = {
    access_token:'access_token',
    AUTHORIZATION: "Authorization",
    axios_config: {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            // "Access-Control-Allow-Origin": "*"
        }
    },
    refresh_token: 'refresh_token',
    URL: process.env.REACT_APP_SERVER_API || 'http://localhost:5050/',
    user_id: 'user_id',
    user_role: 'user_role',
}

export default configServer;
