$(document).ready(()=>{
  const showWeather = (data) => {
    $("#latitude").text("latitude: "+data.coord.lat)
    $("#longitude").text("longitude: "+data.coord.lon)
    $("#country").text(data.sys.country)
    $("#city").text(data.name)
    $("#temp").text(data.main.temp+" °C")
    $("#description").text( data.weather[0].description)
    $("#icon").attr('src', data.weather[0].icon)
    $('#result').css('visibility', 'visible');
  }
  
  //Get coordination from geolocation.
  const getPosition = (position) => {
    let lat= position.coords.latitude;
    let lon= position.coords.longitude;
    let link = "https://weather-proxy.freecodecamp.rocks/api/current?lat="+lat+"&lon="+lon;     
    fetch(link).then(response=>response.json()).then(data=>{
      showWeather(data);
  });
  }
  
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
       $('#result').text("Geolocation is not supported by this browser.");
      $('#result').css('visibility', visible);
    }
  
//Get coordination from form inputs  
  let lat='';
  let lon='';
  $("#lat").on('change', (e)=>{
    //console.log(e.target.value)
    lat = e.target.value;
  })
  $("#lon").on('change', (e)=>{
    //console.log(e.target.value) 
    lon=e.target.value
  })
  
  $('form').on('submit', (event) => {
   event.preventDefault(); 
    let link = "https://weather-proxy.freecodecamp.rocks/api/current?lat="+lat+"&lon="+lon;
    console.log(link);
  
    fetch(link).then(response=>response.json()).then(data=>{
      showWeather(data);
    }); 
  })
  
})
