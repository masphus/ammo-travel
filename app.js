// DATABASE - tersimpan di HP, ga ilang kalau refresh
let drivers = JSON.parse(localStorage.getItem('ammo_drivers')) || [
  {nama:'Budi Pratama', mobil:'Toyota Avanza', status:'Menunggu'},
  {nama:'Rina Wijaya', mobil:'Daihatsu Xenia', status:'Menunggu'},
  {nama:'Andi Saputra', mobil:'Suzuki Ertiga', status:'Aktif'}
];
let editIndex = -1;

function tampilDriver(){
  let t = document.getElementById('driverTable');
  if(!t) return;
  t.innerHTML = '';
  drivers.forEach((d,i)=>{
    let extra = d.status==='Menunggu' 
      ? `<button class="small-btn green" onclick="terima(${i})">Terima</button>
         <button class="small-btn red" onclick="tolak(${i})">Tolak</button>` : '';
    t.innerHTML += `<tr><td>${d.nama}</td><td>${d.mobil}</td><td>${d.status}</td>
    <td>
      <button class="small-btn blue" onclick="editDriver(${i})">Edit</button>
      <button class="small-btn red" onclick="hapusDriver(${i})">Hapus</button>
      ${extra}
    </td></tr>`;
  });
  localStorage.setItem('ammo_drivers', JSON.stringify(drivers));
}
function editDriver(i){
  editIndex=i;
  document.getElementById('editNama').value=drivers[i].nama;
  document.getElementById('editMobil').value=drivers[i].mobil;
  document.getElementById('editStatus').value=drivers[i].status;
  document.getElementById('editBox').style.display='block';
}
function simpanEdit(){
  drivers[editIndex].nama=document.getElementById('editNama').value;
  drivers[editIndex].mobil=document.getElementById('editMobil').value;
  drivers[editIndex].status=document.getElementById('editStatus').value;
  document.getElementById('editBox').style.display='none';
  tampilDriver(); alert('Data tersimpan!');
}
function hapusDriver(i){
  if(confirm('Hapus '+drivers[i].nama+'?')){ drivers.splice(i,1); tampilDriver(); }
}
function terima(i){ drivers[i].status='Aktif'; tampilDriver(); alert(drivers[i].nama+' diterima, bisa ONLINE!'); }
function tolak(i){ drivers[i].status='Ditolak'; tampilDriver(); }
tampilDriver();