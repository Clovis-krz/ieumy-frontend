
function getRestaurant(props){
    var { api_url, resto_id, setRestaurant } = props;
    fetch(api_url+"/restaurants/"+resto_id)
      .then(res => res.json())
      .then(
        (result) => {
          setRestaurant(result.data.attributes);
        }
      )
}

export default{
    getRestaurant,
}