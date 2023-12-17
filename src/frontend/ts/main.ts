
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
 
                    ul.innerHTML = '';      //Limpio la lista antes de cargar nuevamente

                    for (let d of datos) {
                        let itemList =
                        ` <li class="collection-item avatar" style="height: 100px">`
                        
                        if(d.type == "1"){          //Agrego el icono correspondiente a cada tipo de dispositivo
                            itemList +=
                            `<img src="./static/images/power.png" alt="" class="circle">`
                        } else if(d.type == "2"){
                            itemList +=
                            `<img src="./static/images/Proportional.png" alt="" class="circle">`
                        }
                        else if(d.type == "3"){
                            itemList +=
                            `<img src="./static/images/Monitoring.png" alt="" class="circle">`
                        }


                        itemList +=                        
                        `<span class="title">${d.name}</span>
                        <p>
                         ${d.description}
                        </p>
                        <label font-size:10px;>
                        Init Date:
                        </label>                        
                        <p>
                         ${d.lastupdate}
                        </p>                        
                        <a href="#!" class="secondary-content">`

                        
                        if(d.type == "1"){
                            //Dispositivos tipo ON/OFF
                            
                        itemList +=
                        `<div class="switch">
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
                      </div>`
                        
                    }else if(d.type == "2"){
                            //Dispositivos tipo Proporcional

                        itemList +=
                        `<div class="input-field" style="margin-top:0px; margin-bottom:0px; text-align: center;">
                            <input type="number" style="text-align: center; height: 20px; width: 40px; padding: 1px 1px 1px 1px;" min="1" max="10"`;
                            itemList+= `value="${d.proportional}" id="range_${d.id}">
                        </div>`
                    }else if(d.type == "3"){
                            //Dispositivos tipo Sensor
                        console.log(d.measure);
                    itemList +=
                    `<div class="input-field" style="margin-top:0px; margin-bottom:0px; text-align: center;">
                    <input disabled type="number" style="text-align: center; height: 20px; width: 40px; padding: 1px 1px 1px 1px;" min="1" max="10"`;
                    itemList+= `value="${d.measure}" id="measure_${d.id}">
                    <div style="display: inline-block; vertical-align: middle; margin-left: 5px;">
                    <label for="measure_${d.id}" style="margin-bottom: 0;font-size:15px;">${d.unit}</label>
                  </div>
                </div>`
                }
                    
                    itemList +=
                      `<div>
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

                        if(d.type == "1"){
                        let checkbox = document.getElementById("cb_" + d.id);
                        checkbox.addEventListener("click", this);  
                        } else if(d.type == "2"){
                        let range = document.getElementById("range_" + d.id);
                        range.addEventListener("change", this);
                        }                      
                        
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

    private ChangePropDevice(id:number,prop:number) {    //Funcion para cambiar el estado de un dispositivo
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
               
        xmlRequest.open("POST", "http://localhost:8000/DeviceChangeProp", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id: id,
            prop: prop   };
        xmlRequest.send(JSON.stringify(s));
    }


    private CrearDevice() {                                 //Funcion para crear un dispositivo

        let name =<HTMLInputElement> document.getElementById("dev_name");
        let descript = <HTMLInputElement> document.getElementById("dev_descript");
        let type = <HTMLInputElement> document.getElementById("dev_type");

        let unit = <HTMLInputElement> document.getElementById("dev_unit");

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
            descript: descript.value,  
            type: type.value,    
            unit: unit.value
        };
        xmlRequest.send(JSON.stringify(s)); 

        name.value = "";        //limpio los campos
        descript.value = "";
        
        let ul = document.getElementById("listaDisp"); 
        ul.innerHTML = '';      //Limpio la lista antes de cargar nuevamente
        unit.style.display = 'none';

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

    private SelectDevice(): void{

        let type = <HTMLInputElement> document.getElementById("dev_type");
        var instance = M.FormSelect.getInstance(document.getElementById("DeviceSelect"));

        let unit = <HTMLInputElement> document.getElementById("dev_unit");    
        //let label = <HTMLInputElement> document.getElementById("dev_unit_label");      

        var selectedOption = instance.input.value;

        if(selectedOption == "ON/OFF"){
            type.value = "1";            
        } else if(selectedOption == "Proportional"){
            type.value = "2";
        } else if(selectedOption == "Monitoring"){
            type.value = "3"; 

            unit.style.display = 'block';
            //label.style.display = 'block';

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

        //Funciones de Crear Dispositivo

        else if("DeviceSelect" == elemento.id){
            this.SelectDevice();
        }

        //Funciones de Cambiar valor proporcional

        else if (elemento.id.startsWith("range_")) {                
            let range = <HTMLInputElement>elemento;
            console.log(elemento.id.substring(6, elemento.id.length), range.value);            
            this.ChangePropDevice(parseInt(elemento.id.substring(6, elemento.id.length)),parseInt(range.value));
        }


    }
}

    
window.addEventListener("load", () => {

    var elems = document.querySelectorAll('select');
    var instance = M.FormSelect.init(elems, "");

    var elemsModal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsModal, "");

    var dropdown = document.querySelectorAll('select');
    var instances = M.FormSelect.init(dropdown, ""); 

    let main1: Main = new Main();

    //let slider = document.getElementById('range');


    let boton = document.getElementById("btnListar");    
    boton.addEventListener("click", main1);   

    let botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.addEventListener("click",main1);

    let botonCrear = document.getElementById("btn_create");
    botonCrear.addEventListener("click",main1);

    let botonEditar = document.getElementById("btn_edit");
    botonEditar.addEventListener("click",main1);

    var SelectElem = document.getElementById("DeviceSelect");
    SelectElem.addEventListener("change", main1); 

    main1.buscarDevices();           //Refresco la lista de dispositivos
});




