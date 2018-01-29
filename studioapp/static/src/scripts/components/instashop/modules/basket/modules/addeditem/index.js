import React, { Component } from 'react';
import { CookiesService } from './../../../../../../services/cookies';
import message from './../../../../../../services/messages/index';
import config from './../../../../../../configs/index';

class AddedItemsList extends Component {

  constructor(props) {
    super(props);   
    this.state = {
        addedGoodsList: []     
    };
    this.removeItem = this.removeItem.bind(this);
    this.changeCount = this.changeCount.bind(this);
  }
  removeItem(event){

    let googsId = event.target.getAttribute('data-id');;
    let addedItemsList = CookiesService.getCookie('goodsArray');
    
    if ( addedItemsList.length > 0 ){
      addedItemsList =JSON.parse(addedItemsList);  

      for ( let i = 0; i < addedItemsList.length; i++ ){
        if ( Number(addedItemsList[i].id) === Number(googsId) ){   
          
          addedItemsList.splice(i, 1);
          CookiesService.setCookie('goodsArray',JSON.stringify(addedItemsList),'7');  
          this.setState({
            'addedGoodsList': addedItemsList
          });  

        }
      }
    }
  }
  changeCount(id,action){

    const counter = document.getElementById(`count${id}`);    
    const minus = document.getElementById(`minus${id}`);
    const timeSave = config.api.timeToSaveAddedList;
    let addedItemsList = JSON.parse(CookiesService.getCookie('goodsArray'));
    let goodsArray = []; 
    let goodsItem ;      
        
    for ( let i = 0; i < addedItemsList.length; i++ ){
      if ( Number(addedItemsList[i].id) === Number(id) ){
          let newCount ;        
          if( action === "inc"){
            newCount = Number(addedItemsList[i].count) + 1;
            counter.innerHTML = newCount;
          }else if( action === "dec"){
            newCount = Number(addedItemsList[i].count) - 1;
            if ( newCount === 0 ){
              newCount = 1;
            }
            counter.innerHTML = newCount;
          }   
          if ( Number(newCount) < 2 ){
            minus.style.pointerEvents = 'none';
          } else {
            minus.style.pointerEvents = 'all';
          }
          goodsItem = {
            id : id,
            count : newCount.toString(),
            title : addedItemsList[i].title,
            price : addedItemsList[i].price,
            image : addedItemsList[i].image
          };
          goodsArray.push(goodsItem); 
          continue;
      }
      goodsArray.push(addedItemsList[i]);
    }  
    CookiesService.setCookie('goodsArray',JSON.stringify(goodsArray),timeSave);
  }
  componentDidMount(){
    const cockie = CookiesService.getCookie('goodsArray');
    if ( cockie.length >= 0 ){
      this.setState({
        'addedGoodsList': JSON.parse(cockie)
      });
    }      
  }
  render(){
    const addedGoodsList = this.state.addedGoodsList;
    let notFound;

    if ( addedGoodsList.length === 0 ){
        notFound = <div className="absolute alert alert-warning" role="alert">
                     {message.message.noResults}
                   </div>
    }

    return (
      <div>       
        {notFound}
        <ul className="added_goods_list">
          {addedGoodsList.map((addedGoodsitem,index) =>     
            <li key={index} className="row">
                <div className="preview" style={{backgroundImage: "url(" + addedGoodsitem.image + ")"}}></div>
                <div className="description">
                    <h4 className="title">                                                    
                      {addedGoodsitem.title}
                    </h4>
                    <h4 className="price">
                        ₴ {addedGoodsitem.price}
                    </h4>
                    <div className="changeCount">
                      <div id={"minus" + addedGoodsitem.id} className="minus"
                        onClick={() => this.changeCount(addedGoodsitem.id,'dec')}>
                        -
                      </div>
                      <div className="allcount" id={"count" + addedGoodsitem.id} >
                         {addedGoodsitem.count}                      
                      </div>
                      <div className="plus"
                        onClick={() => this.changeCount(addedGoodsitem.id,'inc')}>
                        +
                      </div>
                    </div>
                    <div 
                        data-id={addedGoodsitem.id} 
                        onClick={(event) => this.removeItem(event)}
                        className="remove_btn" >
                    </div>  
                </div> 
            </li>
          )}   
        </ul>
      </div>
    )
  }
}

export default AddedItemsList;
