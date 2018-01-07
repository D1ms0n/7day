var socket = '192.168.56.101:8000'


class Item_row extends React.Component{
    constructor(props){
    super(props)
    }
    render(){
    console.log(this.props)

            return(
            <div className="row">
                <div className="col-4">
                    <img src = {this.props.display_src} className = "img-fluid" />
                </div>
                <div className="col-4">
                    <p>{this.props.caption}lalalS</p>
                </div>
            </div>
        )

    }

}


class Shop extends React.Component{
    constructor(props){
        super(props)
        this.state = {'medias' : []}



    }

    renderItem(item){
        return(<Item_row display_src = {item.display_src}
                          caption    = {item.caption} />)
    }

    componentWillMount(){
        var link = 'http://' + socket + '/api/medias/'
        fetch(link, {
                 method: 'GET',
                 headers: {
                    Accept: "application/json",
                            "Content-Type": "application/json"
                    },

                 })
                .then(response => response.json())
                .then(json => {this.setState({'medias':json})})
    }




    render(){
        return(
            <div>
              {this.state.medias.map(this.renderItem)}
            </div>

        );
    }
}


ReactDOM.render(
  <Shop />,
  document.getElementById('container')
);

