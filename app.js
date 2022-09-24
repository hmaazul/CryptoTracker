const form = document.querySelector('#searchForm');
const res = document.querySelector('#result');
var upd;
form.addEventListener('submit',(f)=>{
    f.preventDefault();
    //check whether upd have some previous coin, then stop updating the previous coin//
    if(upd)
    {
        clearTimeout(upd);
    }
    const ctype = form.elements.coinType.value;
    fetchPrice(ctype);
})

const fetchPrice = async(ctype) => {
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`)
    // console.log(r);
    const name = r.data.coin.name;
    const price = r.data.coin.price;
    const vol = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const target = 'USD';

    res.innerHTML = `
    <tr style="background-color: blue; color: white; font-weight:700;">
    <td style="border: 1px solid;">Property</td>
    <td>Value</td>
    </tr>

    <tr>
    <td>${name}</td>
    <td>${price} ${target}</td>
    </tr>

    <tr>
    <td>Volume</td>
    <td>${vol}</td>
    </tr>

    <tr>
    <td>Change in 1-day</td>
    <td>${change}</td>
    </tr>
    `
    //update the current selected coin after every 10 seconds by calling the same function again //
    upd = setTimeout(()=>fetchPrice(ctype),10000);
}
