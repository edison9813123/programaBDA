function transferencia(){
    var n_cuenta_cuenta = document.getElementById("cuenta_fuente");
    var n_cuenta_recibe = document.getElementById("cuente_destino");
    var monto = document.getElementById("monto");


    axios.post('http://localhost:4000/transaccion', {
        n_cuenta_cuenta: n_cuenta_cuenta.value,
        n_cuenta_recibe: n_cuenta_recibe.value,
        monto: monto.value
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

function transferenciaError(){
    var n_cuenta_cuenta = document.getElementById("cuenta_fuente1");
    var n_cuenta_recibe = document.getElementById("cuente_destino1");
    var monto = document.getElementById("monto1");


    axios.post('http://localhost:4000/transaccion_error', {
        n_cuenta_cuenta: n_cuenta_cuenta.value,
        n_cuenta_recibe: n_cuenta_recibe.value,
        monto: monto.value
      })
      .then(function (response) {
        console.log(response);
        alert("Ha ocurrido un error de transferencia"+response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
}