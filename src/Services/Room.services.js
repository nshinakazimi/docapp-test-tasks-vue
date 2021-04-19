import { httpClient } from "../utils/Api";


class Services {
    constructor() {
        // Set token
    }

    getRooms() {
        return httpClient.get('rooms.json').then(res => {
            return res.data;
        })
    }

    getConsentForms() {
        return httpClient.get('consent-forms.json').then(res => {
            return res.data
        })
    }

    getConsentFormDetails(code) {
        return httpClient.get(`consent-form-details/${code}.json`).then(res => {
            return res.data
        })
    }
}

export default (new Services());