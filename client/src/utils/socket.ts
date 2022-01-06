import connect from "socket.io-client"

const socket = connect(process.env.VUE_APP_API_URI);

export default socket;