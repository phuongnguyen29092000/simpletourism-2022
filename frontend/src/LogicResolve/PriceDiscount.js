import RegardPrice from "./RegardPrice";

export default  function PriceDiscount({valuePrice, valueDiscount}){
    valuePrice = parseInt(valuePrice)
    valueDiscount = parseInt(valueDiscount*100);
    return <>
         Giá: {valueDiscount !==0 ? 
         <>
            <span style={{textDecoration:"line-through", color:"GrayText"}}>₫{RegardPrice(valuePrice)}</span>
            <span style={{color:'red'}}>  ₫{RegardPrice(valuePrice*(100-valueDiscount)/100)}</span>
         </>: 
         <span style={{color:'red'}}>
            ₫{RegardPrice(valuePrice)}
        </span>}
    </>
}