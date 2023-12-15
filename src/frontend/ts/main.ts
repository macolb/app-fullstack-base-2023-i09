
var M;
class Main implements EventListenerObject{
    public usuarios: Array<Usuario>= new Array<Usuario>();
  

    private buscarPersonas() {                  //Funcion para buscar los usuarios en la base de datos
   
        for (let u of this.usuarios) {
            console.log(u.mostrar(),this.usuarios.length);
        }
    }

    public buscarDevices() {                   //Funcion para buscar los dispositivos en la base de datos
        
        let xmlRequest = new XMLHttpRequest();
        
        xmlRequest.onreadystatechange = () => {
     
            if (xmlRequest.readyState == 4) {
                if(xmlRequest.status==200){
                    console.log(xmlRequest.responseText, xmlRequest.readyState);    
                    let respuesta = xmlRequest.responseText;
                    let datos:Array<Device> = JSON.parse(respuesta);
                    
                    let ul = document.getElementById("listaDisp"); 

                    for (let d of datos) {
                        let itemList =
                        ` <li class="collection-item avatar" style="height: 100px">
                        <img src="./static/images/lightbulb.png" alt="" class="circle">
                        <span class="title">${d.name}</span>
                        <p>
                         ${d.description}
                        </p>
                        <a href="#!" class="secondary-content">
                        <div class="switch">
                        <label>
                          Off
                          <input type="checkbox"`;
                          itemList +=`id="cb_${d.id}"`
                        if (d.state) {
                            itemList+= ` checked `
                        }
                        
                        itemList+= `>
                          <span class="lever"></span>
                          On
                        </label>
                      </div>
                        
                      <div>
                      <button class="waves-effect waves-light btn ">
                      <i class="large material-icons modal-trigger" href="#modal3"`;
                      itemList +=` id="edit_${d.id}"`
                      itemList+= `>create</i></button>

                      <button class="waves-effect waves-light btn ">                      
                      <i class="large material-icons" `;
                      itemList +=` id="del_${d.id}"`
                      itemList+= `>delete</i></button>
                      </div>

                        </a>
                      </li>`
                       
                        ul.innerHTML += itemList;

                    }
                    for (let d of datos) {          //Adjunto los eventos a los botones

                        let checkbox = document.getElementById("cb_" + d.id);
                        checkbox.addEventListener("click", this);                        
                        
                        let botonEdit = document.getElementById("edit_" + d.id);
                        botonEdit.addEventListener("click", this);

                        let botonDel = document.getElementById("del_" + d.id);
                        botonDel.addEventListener("click", this);

                    }

                }else{
                    console.log("no encontre nada");
                }
            }
            
        }
        xmlRequest.open("GET","http://localhost:8000/devices",true)
        xmlRequest.send();
    }

    private ChangeStateDevice(id:number,state:boolean) {    //Funcion para cambiar el estado de un dispositivo
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego respuesta: ",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta!");
                }
            }
        }
               
        xmlRequest.open("POST", "http://localhost:8000/DeviceChangeState", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id: id,
            state: state   };
        xmlRequest.send(JSON.stringify(s));
    }

    private CrearDevice() {                                 //Funcion para crear un dispositivo

        let name =<HTMLInputElement> document.getElementById("dev_name");
        let descript = <HTMLInputElement> document.getElementById("dev_descript");         

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego respuesta: ",xmlRequest.responseText);      
                } else {
                    alert("Salio mal la consulta!");
                }
            }
        }
               
        xmlRequest.open("POST", "http://localhost:8000/deviceAdd", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            name: name.value,
            descript: descript.value  };
        xmlRequest.send(JSON.stringify(s)); 

        name.value = "";        //limpio los campos
        descript.value = "";
        
        let ul = document.getElementById("listaDisp"); 
        ul.innerHTML = '';      //Limpio la lista antes de cargar nuevamente

    }

    private deleteDevice(id:number) {
        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego respuesta: ",xmlRequest.responseText); 
                    //alert("Se elimino el dispositivo!");        
                } else {
                    alert("Salio mal la consulta");
                }
            }
        }
               
        xmlRequest.open("POST", "http://localhost:8000/deviceDel", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {id: id};
        xmlRequest.send(JSON.stringify(s));  

        let ul = document.getElementById("listaDisp"); 
        ul.innerHTML = '';            //Limpio la lista antes de cargar nuevamente
    }   
    
    private cargarDeviceEdit(id:number) {

        let name =<HTMLInputElement> document.getElementById("name_edit");
        let descript = <HTMLInputElement> document.getElementById("descript_edit");
        let id_editable =<HTMLInputElement> document.getElementById("id_edit");  

        let xmlRequest = new XMLHttpRequest();
        
        xmlRequest.onreadystatechange = () => {
     
            if (xmlRequest.readyState == 4) {
                if(xmlRequest.status==200){
                    console.log(xmlRequest.responseText, xmlRequest.readyState);    
                    let respuesta = xmlRequest.responseText;
                    let datos:Device = JSON.parse(respuesta)[0];
                    console.log(datos); 

                    name.value = datos.name;        
                    descript.value = datos.description;
                    id_editable.value = datos.id.toString();

                }else{
                    console.log("no encontre nada");
                }
            }
        
        }
        xmlRequest.open("GET","http://localhost:8000/devicetoEditar/"+id,true)
        xmlRequest.send();


    }

    private editarDevice() {

        let name =<HTMLInputElement> document.getElementById("name_edit");
        let descript = <HTMLInputElement> document.getElementById("descript_edit"); 
        let id_editable =<HTMLInputElement> document.getElementById("id_edit");  

        let xmlRequest = new XMLHttpRequest();

        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState == 4) {
                if (xmlRequest.status == 200) {
                    console.log("llego respuesta: ",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta");
                }
            }
        }

        xmlRequest.open("POST", "http://localhost:8000/deviceEditar", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            name: name.value,
            descript: descript.value, 
            id: id_editable.value
         };
        xmlRequest.send(JSON.stringify(s)); 

        name.value = "";        //limpio los campos
        descript.value = "";
        
        let ul = document.getElementById("listaDisp"); 
        ul.innerHTML = '';      //Limpio la lista antes de cargar nuevamente
 
    }      

    private cargarUsuario(): void{
        let iNombre =<HTMLInputElement> document.getElementById("iNombre");
        let iPassword = <HTMLInputElement>document.getElementById("iPassword");

        console.log(iNombre,iPassword);  

        let pInfo = document.getElementById("pInfo");
        if (iNombre.value.length > 3 && iPassword.value.length > 3) {
            let usuari1: Usuario = new Usuario(iNombre.value, "user", iPassword.value,23);
            this.usuarios.push(usuari1);
            iNombre.value = "";
            iPassword.value = "";
            
            pInfo.innerHTML = "Se cargo correctamente!";
            pInfo.className ="textoCorrecto";
            
        } else {
            pInfo.innerHTML = "Usuario o contraseña incorrecta!";
            pInfo.className ="textoError";
        }
    }

    //Eventos

    handleEvent(object: Event): void {
        let elemento = <HTMLElement>object.target;
        
        //Funciones de botones en lista de dispositivos

        if (elemento.id.startsWith("edit_")){                       
            let id = elemento.id.substring(5,elemento.id.length);
            this.cargarDeviceEdit(parseInt(id));          

        } else if (elemento.id.startsWith("del_")){                 
            let id = elemento.id.substring(4,elemento.id.length);
            this.deleteDevice(parseInt(id));
            this.buscarDevices();           //Refresco la lista de dispositivos

        } else if (elemento.id.startsWith("cb_")) {                
            let checkbox = <HTMLInputElement>elemento;
            console.log(elemento.id.substring(3, elemento.id.length), checkbox.checked);            
            this.ChangeStateDevice(parseInt(elemento.id.substring(3, elemento.id.length)),checkbox.checked);

        }
         
        //Funciones de botones en modals

          else if ("btnListar" == elemento.id) {
            this.buscarDevices();  

        } else if ("btn_edit" == elemento.id) {
            this.editarDevice();
            this.buscarDevices();           //Refresco la lista de dispositivos

        } else if ("btnGuardar" == elemento.id) {
            this.cargarUsuario();

        } else if ("btn_create" == elemento.id) {            
            this.CrearDevice();
            this.buscarDevices();           //Refresco la lista de dispositivos

        }
    }
}

    
window.addEventListener("load", () => {

    var elems = document.querySelectorAll('select');
    var instance = M.FormSelect.init(elems, "");

    var elemsModal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsModal, "");

    let main1: Main = new Main();

    let boton = document.getElementById("btnListar");    
    boton.addEventListener("click", main1);   

    let botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.addEventListener("click",main1);

    let botonCrear = document.getElementById("btn_create");
    botonCrear.addEventListener("click",main1);

    let botonEditar = document.getElementById("btn_edit");
    botonEditar.addEventListener("click",main1);

    main1.buscarDevices();           //Refresco la lista de dispositivos
});




