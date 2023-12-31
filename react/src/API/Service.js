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
    
    static async createBooking(data) {
        try {
            const response = await axios.post('http://localhost/bookings/create', data)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteBooking(id) {
        try {
            const response = await axios.delete('http://localhost/bookings/delete/' + id)
            return response
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

    static async getWidgets() {
        try {
            const data = await axios.get('http://localhost/widgets/')
            return data
        } catch (error) {
            console.log(error)
        }
    }

}