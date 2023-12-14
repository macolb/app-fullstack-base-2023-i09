
var M;
class Main implements EventListenerObject{
    public usuarios: Array<Usuario>= new Array<Usuario>();
  

    private buscarPersonas() {

   
        for (let u of this.usuarios) {
            console.log(u.mostrar(),this.usuarios.length);
        }
    }

    private buscarDevices() {
        
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
                      <i class="large material-icons"`;
                      itemList +=` id="edit_${d.id}"`
                      itemList+= `>create</i></button>


                      <button class="waves-effect waves-light btn ">                      
                      <i class="large material-icons"`;
                      itemList +=` id="del_${d.id}"`
                      itemList+= `>delete</i></button>
                      </div>

                        </a>
                      </li>`
                       
                        ul.innerHTML += itemList;

                    }
                    for (let d of datos) {
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

    private ejecutarPost(id:number,state:boolean) {
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
               
        xmlRequest.open("POST", "http://localhost:8000/deviceEdit", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id: id,
            state: state   };
        xmlRequest.send(JSON.stringify(s));
    }

    private cargarDevice() {
        let name =<HTMLInputElement> document.getElementById("dev_name");
        let descript = <HTMLInputElement> document.getElementById("dev_descript");         

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
               
        xmlRequest.open("POST", "http://localhost:8000/deviceAdd", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            name: name.value,
            descript: descript.value  };
        xmlRequest.send(JSON.stringify(s));  
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






    handleEvent(object: Event): void {
        let elemento = <HTMLElement>object.target;

        //console.log(elemento);
        
        if (elemento.id.startsWith("edit_")){
            let id = elemento.id.substring(5,elemento.id.length);
            console.log("edit",id);


        }   else if (elemento.id.startsWith("del_")){
            let id = elemento.id.substring(4,elemento.id.length);
            console.log("del",id);


        }
         



        
        if ("btnListar" == elemento.id) {
            this.buscarDevices();   
        } else if ("btnGuardar" == elemento.id) {
            console.log("Guardar usuario");
            this.cargarUsuario();
        } else if ("btn_create" == elemento.id) {
            console.log("Crear disp");            
            //this.cargarUsuario();
            this.cargarDevice();
            //console.log("cambio el select");
        } else if (elemento.id.startsWith("cb_")) {
            let checkbox = <HTMLInputElement>elemento;
            console.log(elemento.id.substring(3, elemento.id.length), checkbox.checked);            
            this.ejecutarPost(parseInt(elemento.id.substring(3, elemento.id.length)),checkbox.checked);
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

    //var DeviceType = document.getElementById("dev_type");
    //DeviceType.addEventListener("change",main1);

    //let botonDevType = document.getElementById("dev_type");
    //botonDevType.addEventListener("click",main1);

    //console.log(instances2.getSelectedValues());

    /*let checkbox = document.getElementById("cb");
    checkbox.addEventListener("click", main1);
    */


});

