
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
                        ` <li class="collection-item avatar">
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
                          itemList +=`nuevoAtt="${d.id}" id="cb_${d.id}"`
                        if (d.state) {
                            itemList+= ` checked `
                        }
                        
                        itemList+= `>
                          <span class="lever"></span>
                          On
                        </label>
                      </div>
                      <button id="btnEdit" class="waves-effect waves-light btn modal-trigger"><i class="large material-icons">create</i></button>
                      <button id="btnDelete" class="waves-effect waves-light btn modal-trigger"><i class="large material-icons">delete</i></button>
                        </a>
                      </li>`
                       
                        ul.innerHTML += itemList;

                    }
                    for (let d of datos) {
                        let checkbox = document.getElementById("cb_" + d.id);

                        checkbox.addEventListener("click", this);
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
                    console.log("llego resputa",xmlRequest.responseText);        
                } else {
                    alert("Salio mal la consulta");
                }
            }
            
            

        }
        
       
        xmlRequest.open("POST", "http://localhost:8000/device", true)
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id: id,
            state: state   };
        xmlRequest.send(JSON.stringify(s));
    }

    private cargarUsuario(): void{
        let iNombre =<HTMLInputElement> document.getElementById("iNombre");
        let iPassword = <HTMLInputElement>document.getElementById("iPassword");
        let pInfo = document.getElementById("pInfo");
        if (iNombre.value.length > 3 && iPassword.value.length > 3) {
            let usuari1: Usuario = new Usuario(iNombre.value, "user", iPassword.value,23);
            this.usuarios.push(usuari1);
            iNombre.value = "";
            iPassword.value = "";
           
            
            pInfo.innerHTML = "Se cargo correctamente!";
            pInfo.className ="textoCorrecto";
            
        } else {
            pInfo.innerHTML = "Usuario o contraseña incorrecta!!!";
            pInfo.className ="textoError";
        }
        
        
    }

    handleEvent(object: Event): void {
        let elemento = <HTMLElement>object.target;
        
        
        if ("btnListar" == elemento.id) {
            this.buscarDevices();

            
        } else if ("btnGuardar" == elemento.id) {
            this.cargarUsuario();
        } else if (elemento.id.startsWith("cb_")) {
            let checkbox = <HTMLInputElement>elemento;
            console.log(checkbox.getAttribute("nuevoAtt"),checkbox.checked, elemento.id.substring(3, elemento.id.length));
            
            this.ejecutarPost(parseInt(checkbox.getAttribute("nuevoAtt")),checkbox.checked);
        }

    }

}

    
window.addEventListener("load", () => {

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, "");

    var elemsModal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsModal, "");

    let main1: Main = new Main();
    let boton = document.getElementById("btnListar");
    
    boton.addEventListener("click", main1);   

    let botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.addEventListener("click",main1);

    /*let checkbox = document.getElementById("cb");
    checkbox.addEventListener("click", main1);
    */


});

