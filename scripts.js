async function healthCheck(obj){

const options = {method: 'GET'};

try {
  const response = await fetch(obj.getAttribute("target"), options);
  const data = await response.json();
  console.log(response);
  if (response.status == 200) obj.innerHTML = `<span class="green">healthy</span>`;
  else obj.innerHTML = `<span class="yellow">anomalous</span>`;
} catch (error) {
  console.error(error);
   obj.innerHTML = `<span class="red">unavailable</span>`;
}

}

var healthChecks = [...document.getElementsByTagName("healthCheck")]
healthChecks.forEach(check => {healthCheck(check)}) 