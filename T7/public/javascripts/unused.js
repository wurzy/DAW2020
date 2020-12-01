function sendPut(href){
    let body = {}
    let tpcs = []
    let i = 1
    elems = document.getElementById("form").elements
    body["id"] = elems["numero"].defaultValue
    body["numero"] = elems["numero"].value
    body["nome"] = elems["nome"].value
    body["git"] = elems["git"].value
    while (i < 9){
      tpcs.push(elems[`tpc${i}`].checked ? 1 : 0)
      i++
    }
    body["tpc"] = tpcs 
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", href, true)
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.open();
        document.write(xhttp.responseText);
        document.close();
      }
    }
    xhttp.send(JSON.stringify(body))
  }     