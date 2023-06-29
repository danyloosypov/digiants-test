import axios from 'axios';


export default class Service {

    static async getBookings() {
        try {
            const data = await axios.get('http://localhost/bookings/')
            return data.data
        } catch (error) {
            console.log(error)
        }
    }

    static async getTakenDates() {
        try {
            const data = await axios.get('http://localhost/takendates/')
            return data.data
        } catch (error) {
            console.log(error)
        }
    }

}