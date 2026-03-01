async function healthCheck(obj) {
  obj.innerHTML = `<span class="yellow">pinging...</span>`
  const options = {
    method: 'GET'
  };

  try {
    const response = await fetch(obj.getAttribute("target"), options);
    const data = await response.json();
    console.log(response);
    if (response.status == 200) obj.innerHTML = `<span class="green">healthy</span>`;
    else obj.innerHTML = `<span class="orange">anomalous</span>`;
  } catch (error) {
    console.error(error);
    obj.innerHTML = `<span class="red">unavailable</span>`;
  }

}

var healthChecks = [...document.getElementsByTagName("healthCheck")]
healthChecks.forEach(check => {
  healthCheck(check)
})


var pass = checkConsentCookie()
if (pass==undefined) {
  var consentForm = document.createElement("dialog")
  consentForm.setAttribute("closedby", "none")
  consentForm.classList.add("consent-form")
  consentForm.innerHTML += "<p>greetings, traveler!</p>"
  consentForm.innerHTML += "\n<br>"
  consentForm.innerHTML += "<p>this is an <span class='red'>adult-oriented</span> network.</p>"
  consentForm.innerHTML += "\n<br>"
  consentForm.innerHTML += "<p>by entering your date of birth, you consent to letting</p>"
  consentForm.innerHTML += "<p>this site determine if you are old enough to enter.</p>"
  consentForm.innerHTML += "\n<br>"
  consentForm.innerHTML += "<p>you also consent to having a cookie be stored on your</p>"
  consentForm.innerHTML += "<p>device so that this site can remember its decision.</p>"
  consentForm.innerHTML += "\n<br>"
  consentForm.innerHTML += "<p>also this site uses javascript btw.</p>"
  consentForm.innerHTML += "\n<br>"
  consentForm.innerHTML += "<p>thank you for reading! <3</p>"
  consentForm.innerHTML += "\n<br>"

  var dob = document.createElement("input");
  dob.setAttribute("type", "date");
  dob.setAttribute("name", "dob");
  dob.setAttribute("keyup", "checkDob()");
  dob.classList.add("yellow");
  consentForm.appendChild(dob)

  consentForm.innerHTML += "\n<br>"

  var confirm1 = document.createElement("a")
  confirm1.innerHTML = "submit"
  confirm1.onclick = () => {
    validateDob()
    
  }
  consentForm.appendChild(confirm1)

  consentForm.show()
  document.getElementsByTagName("body")[0].appendChild(consentForm)
} else if (pass==false) {
  document.body.innerHTML="you have been deemed too young to enter this site..."
}

function validateDob() {
  try {
    if ((new Date(Date.now())).getYear() - document.getElementsByName("dob")[0].valueAsDate.getYear() >= 18) {
      createConsentCookie(true)
    } else {
      createConsentCookie(false)
    }
    window.location.reload();
  } catch (error) {
    alert("invalid date of birth entered")
  }
}

function createConsentCookie(ans) {
  var exp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toString()
  document.cookie = `pass=${ans}; expires=${exp}`;
}

function checkConsentCookie() {
  var pass = undefined 
  document.cookie.includes("pass=true")?pass=true:document.cookie.includes("pass=false")?pass=false:pass=undefined;
  if (pass) createConsentCookie();
  return pass;
}