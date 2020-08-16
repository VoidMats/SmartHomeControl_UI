
// import Config from ./config.json
const Config = require('../config.json')

export default class APIData {

    /**
     * The APIData class handle all backend api calls to recive data which could later be used in the front
     * 
     */
    constructor(token='') {
        this.token = token;
        this.controller = new AbortController();
    }

    /**
     * This function can be placed in a componentWillUnmount to abort 
     * any ongoing request to the component. However, if there is a setState
     * function in the request a mount check has to be done.
     */
    abort() {
        this.controller.abort();
    }

    /**
     * This method is used to add or refresh the token
     */
    addToken(token) {
        this.token = token;
    }

    /**
     * This method will send the login and pwd to server and recive a token
     * which is used for all request later on. The token is saved in the class
     * and return to the user. 
     * @param {string} login
     * @param {string} pwd
     */
    /*
    curl -H "Origin: *" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: X-Requested-With" \
    -X OPTIONS --verbose \
    -d '{"username":"test", "password":"test"}' http://192.168.1.52:5054/auth/login
    */
    //  curl -H "Access-Control-Request-Method: POST" -H "Origin: http://localhost" --head http://www.example.com/
    //  curl -i -X POST -d '{"username":"test", "password":"test"}' http://192.168.1.52:5054/auth/login
    async login(login, pwd) {
        const jsonData = {
            "username": login,
            "password": pwd
        }
        const path = this._createHttpPathRoute("auth/login");
        console.log(path)
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(res => res.json())
        .then(result => {
            if (result['msg'] === 'Success') {
                this.token = result['token'];
                return result['token'];
            }
            else {
                return null
            }
        })
        .catch(error => {
            console.error(error);
        });
        return response;
    }


    /**
     * 
     * @async
     * @param {string} name 
     * @param {string} folder 
     * @param {string} position 
     * @param {char} unit 
     * @param {string} comment 
     */
    async addSensor(name, folder, position, unit, comment) {
        const payload = {
            'name' : name,
            'folder' : folder,
            'position' : position,
            'unit' : unit,
            'comment' : comment 
        }
        
        const path = this._createHttpPathRoute("temperature/sensor");
        return await this._fetchDataPost(path, payload)
    }

    async getSensor(sensor) {
        const path =  this._createHttpPathArg("temperature/sensor", [sensor]);
        return await this._fetchDataGet(path)
    }

    async getAllSensor() {
        const path =  this._createHttpPathRoute("temperature/sensor");
        return await this._fetchDataGet(path)
    }

    async deleteSensor(sensor) {
        const path =  this._createHttpPathArg("temperature/sensor", [sensor]);
        return await this._fetchDataDelete(path)
    }

    async startMeasure(secs) {
        const path =  this._createHttpPathArg("/temperature/start", [secs]);
        return await this._fetchDataGet(path)
    }

    async stopMeasure() {
        const path =  this._createHttpPathRoute("/temperature/stop");
        return await this._fetchDataGet(path)
    }

    async readTemperature(sensor) {
        const path =  this._createHttpPathArg("/temperature/read", [sensor]);
        return await this._fetchDataGet(path)
    }

    async getTemperature(sensor, from, to) {
        const payload = {
            'sensor' : sensor,
            'start_date' : from,
            'end_date' : to
        }
        const path =  this._createHttpPathRoute("/temperature");
        return await this._fetchDataGet(path, payload)
    }

    /**
     * This method will create the Url which could be used in a request method.
     * @access private
     * @param {string} route
     */
    _createHttpPathRoute(route) {
        let path = "http://" + Config['url'];
        path += ":" + Config['port'];
        path += '/' + route;
        return path;
    }

    /**
     * This method will create the Url which could be used in a request method.
     * @access private
     * @param {string} route
     * @param {object[]} args
     */
    _createHttpPathArg(route, args = []) {
        let path = "http://" + Config['url'];
        path += ":" + Config['port'];
        path += '/' + route + '/';
        args.forEach(arg => {
            path += "/" + arg
        });
        return path;
    }

    /**
     * This method will fetch data by using POST request
     * @access private
     * @param {string} path
     * @param {object{}} data
     */
    async _fetchDataPost(path, data = {}) {

        return await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok)
                res.json()
            else {
                console.error("Status: " + res.status)
                console.error("Message: " + res.statusText)
                return null
            }
        })
        .then(result => {
            return result;
        })
        .catch(error => console.error(error) );

    }

    /**
     * This method will fetch data by using a GET request
     * @access private
     * @async
     * @param {string} path
     */
    async _fetchDataGet(path, data={}) {

        return await fetch(path, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                return result;
            })
            .catch((error) => console.error(error) );
    }

    /**
     * This method will execute a DELETE request
     * @access private
     * @async
     * @param {string} path
     * @param {object[]} data
     */
    async _fetchDataDelete(path, data={}) {

        return await fetch(path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            return result;
        })
        .catch(error => console.error(error));
    }


}