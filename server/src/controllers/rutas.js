const {Pool}= require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password:'1234',
    database:'ejerbanco',
    port:'5432'
});

const transaccion = async(req, res) => {
    const n_cuenta_cuenta = req.body.n_cuenta_cuenta
    const n_cuenta_recibe = req.body.n_cuenta_recibe
    const monto = req.body.monto
    const fecha = new Date();
    try{
        await pool.query('begin')
        await pool.query(`INSERT INTO public.transaccion(
            id_transaccion, n_cuenta_cuenta, n_cuenta_recibe, tipo_transaccion, monto_total, fecha_transaccion, descripcion, saldo_disponible)
            VALUES ((SELECT MAX(id_transaccion)+1 FROM public.transaccion), $1, $2, 5, 1, $3, 'Transferencia', 'true');
            `,[n_cuenta_cuenta,n_cuenta_recibe,fecha])
    
        await pool.query(`UPDATE public.cuenta
        SET  saldo=saldo-$1
        WHERE n_cuenta=$2;`,[monto,n_cuenta_cuenta])
        
    
        await pool.query(`UPDATE public.cuenta
        SET  saldo=saldo+$1
        WHERE n_cuenta=$2;`,[monto,n_cuenta_recibe])
        await pool.query('COMMIT')
        res.send('Transferencia exitosa');
    }
    catch(e){
        await pool.query('ROLLBACK')
        res.send('Error de transferencia');
    }
}

const transaccionError = async(req,res)=>{
    const n_cuenta_cuenta = req.body.n_cuenta_cuenta
    const n_cuenta_recibe = req.body.n_cuenta_recibe
    const monto = req.body.monto
    const fecha = new Date();
    try{
        await pool.query('begin')
        await pool.query(`INSERT INTO public.transaccion(
            id_transaccion, n_cuenta_cuenta, n_cuenta_recibe, tipo_transaccion, monto_total, fecha_transaccion, descripcion, saldo_disponible)
            VALUES ((SELECT MAX(id_transaccion)+1 FROM public.transaccion), $1, $2, 5, 1, $3, 'Transferencia', 'true');
            `,[n_cuenta_cuenta,n_cuenta_recibe,fecha])
    
        await pool.query(`UPDATE public.cuenta
        SET  saldo=saldo-$1
        WHERE n_cuenta=$2;`,[monto,n_cuenta_cuenta])
        
    
        await pool.query(`UPDATE public.cuenta
        SAT  saldo=saldo+$1
        WHERE n_cuenta=$2;`,[monto,n_cuenta_recibe])
        await pool.query('COMMIT')
        res.send('Transferencia exitosa');
    }
    catch(e){
        await pool.query('ROLLBACK')
        res.send('Error de transferencia');
    }
}


module.exports ={
    transaccion,
    transaccionError
}


