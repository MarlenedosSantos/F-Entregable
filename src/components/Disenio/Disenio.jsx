import React, {Component} from 'react';
import Historia from '../Historia/Historia';
import data from '../data.json';
import Botones from '../Botones/Botones'
import Historial from '../Historial/Historial';
import swal from "sweetalert2";



const historial =[];

export default class Disenio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
      seleccionAnterior: "",
    };
  }

  componentDidMount() {
    swal.fire({
      title: '¡Hola, estas listo para empezar!',
      text: 'Comenza tu viaje, mira todas las aventuras que tenemos para vos.',
     
    })
  }

  componentDidUpdate(estadoPrevio) {
    if (estadoPrevio.contador !== this.state.contador) {
      historial.push(this.state.seleccionAnterior);
    }
  }

  handleClick = (element) => {
    const id = element.target.id;
    const contador = this.state.contador;
    const anterior = this.state.seleccionAnterior;

    if (contador >= 7) {
      swal.fire({
        title: 'Queres volver a comenzar?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Repetir",
        denyButtonText: "Finalizar",
      }).then((result) => {
        if (result.isConfirmed) {
           window.location.reload();
        } else if (result.isDenied) {
          swal.fire('Terminaste', '', 'info')
        }
      })
    } else if (id === "A" && anterior !== "A") {
      this.setState({
        contador: contador + 1,
        seleccionAnterior: "A",
      });
    } else if (id === "A" && anterior === "A") {
      this.setState({
        contador: contador + 2,
        seleccionAnterior: "A",
      });
    } else if (id === "B" && anterior ===  "A") {
      this.setState({
        contador: contador + 3,
        seleccionAnterior: "B",
      });
    } else if (id === "B" && anterior !== "A") {
      this.setState({
        contador: contador + 2,
        seleccionAnterior: "B",
      });
    }
    console.log(historial);
    console.log(contador);
  };

  render() {
    return (
      <>
        <Historia contador={[this.state.contador]} />
        <Botones
          handleClick={this.handleClick}
          opcionA={data[this.state.contador].opciones.a}
          opcionB={data[this.state.contador].opciones.b}
        />
        <Historial
          seleccionAnterior={this.state.seleccionAnterior}
          historial={historial.map(
            (historial, i) => (
              <li key={i}>{historial}</li>
            ),
            data[this.state.contador].id
          )}
        />
      </>
    );
  }
}
