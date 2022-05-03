export default function RegardPrice(price) {
    if (!price) return '0';
    if(price<1000) return price
    let temPrice = JSON.stringify(price)
    var totalPriceArr = []
    for (let i = temPrice.length; i >= 1; i -= 3) {
        var sliceArr = temPrice.slice(i - 3, i)
        if (sliceArr !== '') totalPriceArr.unshift(sliceArr)
        else break
    }
    if (temPrice.length % 3 === 1) {
        totalPriceArr.unshift(temPrice.slice(0, 1))
    } else if (temPrice.length % 3 === 2) {
        totalPriceArr.unshift(temPrice.slice(0, 2))
    }
    temPrice = totalPriceArr.join('.')
    return temPrice
}