
import { CookiesService } from '../../../../services/cookies';

export function countBasketItems(){
    const basketCount = document.getElementById('basketCount');
    const basket = document.getElementById('basket');
    let addedItemsList = CookiesService.getCookie('goodsArray');
    let count = 0;

    if ( addedItemsList.length > 0 ){
        addedItemsList =JSON.parse(addedItemsList);     
        for ( let i = 0; i < addedItemsList.length; i++ ){
            count = Number(count) + Number(addedItemsList[i].count);
        }
        if ( count === 0 ){
            count = '';
        }
        basketCount.innerHTML = count;

        basket.classList.add('active');   
        setTimeout(function(){
            basket.classList.remove('active');
        },1000);

    }        
}
