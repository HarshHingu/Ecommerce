

const fetchedData = fetch('http://fakestoreapi.com/products').then(res => res.json()).then(json => console.log(json));

export default fetchedData;