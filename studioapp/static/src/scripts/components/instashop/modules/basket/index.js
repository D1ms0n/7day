import React, { Component } from 'react';
import { Link } from 'react-router';
import config from './../../../../configs/index';
import ApiService from './../../../../services/api/index';
import { CookiesService } from './../../../../services/cookies';
import AddedItemsList from './modules/addeditem/index';
import { log } from 'util';

class Basket extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            name:'Viking',
            mail:'dwd@kd.dd',
            phone:'0681111111',
            address:'VikingLand',
            comment:'day pokushat'
        };
        this.createOrder = this.createOrder.bind(this);
    }
    createOrder(){

        const addedItemsArray = JSON.parse(CookiesService.getCookie('goodsArray')).map((item)=>(
            {
                id:item.id,
                count:item.count
            }
        ));

        const data = {
            "name": this.state.name,
            "mail": this.state.mail,
            "phone": this.state.phone,
            "address": this.state.address,
            "comment": this.state.comment,
            "items": addedItemsArray
        }
        let apiService = new ApiService();
        apiService.postRequest(`${config.api.orders}`,JSON.stringify(data))
            .then((result) => {  
                console.log(result);            
            })
            .catch((e) => {
                console.log(e);
            });

    }
    render() {
        return (
            <div>                
                <div className="container-fluid header_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Link to="/instashop">to shop</Link>     
                                <div className="clearfix"></div>
                            </div> 
                        </div> 
                    </div> 
                </div>      
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <AddedItemsList/>                                
                            </div> 
                            <div className="col-md-6">
                               <button 
                                    onClick={() => this.createOrder()}
                                    className="btn remove_btn" type="button">
                                    create order
                                </button>  
                            </div>
                        </div> 
                    </div> 
                </div>                  
            </div>
        );
    }
}

export default Basket;