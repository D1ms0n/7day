import React, { Component } from 'react';
import { CookiesService } from './../../../../../../services/cookies';

class AddedItemsList extends Component {

  constructor(props) {
    super(props);   
    this.state = {
        addedGoodsList: []     
    };
    this.removeItem = this.removeItem.bind(this);
  }
  removeItem(event){
    const googsId = event.target.getAttribute('data-id');
    let addedItemsList = CookiesService.getCookie('goodsArray');

    if ( addedItemsList.length > 0 ){
      addedItemsList =JSON.parse(addedItemsList);     
      for ( let i = 0; i < addedItemsList.length; i++ ){
        if ( Number(addedItemsList[i].id) === Number(googsId) ){   
          let index = i;
          if ( i === 0 ){
            index = 2;
          }
          const uptadetList = addedItemsList.splice(index-1, 1);
          CookiesService.setCookie('goodsArray',JSON.stringify(uptadetList),'7');           
          this.setState({
            'addedGoodsList': uptadetList
          });  
        }
      }
    }
  }
  componentDidMount(){ 
      this.setState({
          'addedGoodsList': JSON.parse(CookiesService.getCookie('goodsArray'))
      });  
  }
  render(){
    const addedGoodsList = this.state.addedGoodsList;
    let notFound ;

    if ( addedGoodsList.length === 0 ){
        notFound = <div className="absolute alert alert-warning" role="alert">
                      No results!
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
                        <a href="/">
                            {addedGoodsitem.title}
                        </a>  
                    </h4>
                    <h4 className="price">
                        ₴ {addedGoodsitem.price}
                    </h4>
                    <div>
                      added 
                      <input type="number" value={addedGoodsitem.count} />
                    </div>
                    <button 
                        data-id={addedGoodsitem.id} 
                        onClick={(event) => this.removeItem(event)}
                        className="btn remove_btn" type="button">
                        remove
                    </button>  
                </div> 
            </li>
          )}   
        </ul>
      </div>
    )
  }
}

export default AddedItemsList;
