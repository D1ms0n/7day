var socket = '192.168.56.101:8000'

class User_list extends React.Component{
    constructor(props){
        super(props)
        this.state = {'url'         : '',
                      'method' : 'GET',
                      'params' : '',
                      'response':''
                      }


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitButton = this.handleSubmitButton.bind(this)

    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value})
        console.log(this.state)
    }

    handleSubmitButton(){
        console.log('handleSubmitButton')
        console.log(this.state.method)
        var link = 'http://' + socket + '/api/' + this.state.url + '/'
        switch(this.state.method){
        case 'GET':
            fetch(link, {
                 method: 'GET',
                 headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    },

                 })
                .then(response => response.json())
                .then(json => {this.setState({'response':json})})
            break;
        case 'POST':
            fetch(link, {
                 method: 'POST',
                 headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                    },
                 body: this.state.params

                 })
                .then(response => response.json())
                .then(json => {this.setState({'response':json})})
            break;
        }
    }


    render(){
        return(
            <div>
              <div className="row">
                <div className="col-4">
                  <label>URL:</label>
                  <input type="text" className="form-control" onChange = {this.handleChange} id="url" aria-describedby="basic-addon3"/>
                </div>
              </div>

              <div className="row">
                <div className="col-2">
                  <select id="method" onChange = {this.handleChange} className="form-control">
                    <option>GET</option>
                    <option>POST</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-10">
                  <span className="input-group-text">PARAMS:</span>
                  <input type="text" onChange = {this.handleChange} className="form-control" id="params" aria-describedby="basic-addon3"/>
                </div>
              </div>

              <button type="submit" onClick = {this.handleSubmitButton} className="btn btn-primary">Submit</button>

              <div className="row">
                <div className="col-4">
                  <div>
                    {JSON.stringify(this.state.response)}
                  </div>
                </div>
              </div>
            </div>

        );
    }
}


ReactDOM.render(
  <User_list />,
  document.getElementById('container')
);

