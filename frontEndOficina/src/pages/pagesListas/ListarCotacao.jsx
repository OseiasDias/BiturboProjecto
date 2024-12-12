import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importando o estilo do Toast
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { RiAddLargeFill, RiArrowDownSLine } from "react-icons/ri";
import { Modal, Button, Form } from "react-bootstrap";
import { FaCar } from "react-icons/fa";

// Estilos customizados para a tabela
const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#044697',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bolder',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  },
  cells: {
    style: {
      padding: '8px',
      fontSize: '14px',
    },
  },
};

// eslint-disable-next-line react/prop-types
function VizualizarListaTipo({ setShowModal }) {
  const [records, setRecords] = useState([
    { tipoVeiculo: <>&nbsp;&nbsp;&nbsp;{ 'Turismo'}</>  },
    { tipoVeiculo: <>&nbsp;&nbsp;&nbsp;{ 'SUV'}</> },
    { tipoVeiculo:<>&nbsp;&nbsp;&nbsp;{ 'SUV'}</>  },
    { tipoVeiculo:<>&nbsp;&nbsp;&nbsp;{ 'SUV'}</>  },
    { tipoVeiculo:<>&nbsp;&nbsp;&nbsp;{ 'SUV'}</>  },
  ]);

  const originalRecords = [
    { tipoVeiculo:<>&nbsp;&nbsp;&nbsp;{ 'Turismo'}</> },
    { tipoVeiculo:<>&nbsp;&nbsp;&nbsp;{ 'SUV'}</>  },
    { tipoVeiculo:<>&nbsp;&nbsp;&nbsp;{ 'SUV'}</>  },
    { tipoVeiculo:<>&nbsp;&nbsp;&nbsp;{ 'SUV'}</>  },
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      setRecords(originalRecords);
    } else {
      const filteredRecords = originalRecords.filter(
        (item) => item.tipoVeiculo.toLowerCase().includes(query)
      );
      setRecords(filteredRecords);
    }
  };

  const columns = [
    {
      name: 'Marcas de Veículos',
      selector: (row) => row.tipoVeiculo,
      sortable: true,
    },
    {
      name: 'Tipos de Veículos',
      selector: (row) => row.tipoVeiculo,
      sortable: true,
    },
    {
      name: 'Ações',
      cell: () => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item className="text-danger">
              <MdDeleteOutline />
              &nbsp;&nbsp;Excluir
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
          <h4 className="me-5">Lista Marcas de Veículos</h4>
          <RiAddLargeFill
            className="links-acessos arranjarBTN p-2 border-radius-zero"
            fontSize={35}
            onClick={() => setShowModal(true)} // Aqui abrimos o modal ao clicar
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa Marcas de Veículos"
            onChange={handleSearch}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        footer={<div>Exibindo {records.length} registros no total</div>}
        className="pt-5"
      />

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default function ListarMarcasVeiculos() {
  const [showModal, setShowModal] = useState(false); // Estado para controlar se o modal está visível ou não
  const [novoTipo, setNovoTipo] = useState(""); // Estado para o novo tipo
  const [tipoSelecionado, setTipoSelecionado] = useState(""); // Estado para o tipo de veículo selecionado
  const [tiposVeiculos, setTiposVeiculos] = useState([ // Tipos de veículos disponíveis
    { id: 1, nome: "Turismo" },
    { id: 2, nome: "SUV" },
  ]);

  const handleNovoTipoChange = (e) => setNovoTipo(e.target.value);

  const handleTipoSelecionadoChange = (e) => setTipoSelecionado(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novoTipo.trim()) {
      setTiposVeiculos([
        ...tiposVeiculos,
        { id: tiposVeiculos.length + 1, nome: novoTipo },
      ]);
      setNovoTipo(""); // Limpar após envio
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="Marcas de Veículos" icone={<IoIosAdd />} />
            <div className="vh-100 alturaPereita">
              <VizualizarListaTipo setShowModal={setShowModal} /> {/* Passando a função de abrir o modal */}
            </div>
            <div className="div text-center np pt-2 mt-2 ppAr">
              <hr />
              <p className="text-center">
                Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos reservados.
                <br />
                Desenvolvido por: <b>Oseias Dias</b>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Tipo de Veículo */}
      <Modal show={showModal} onHide={() => setShowModal(false)} scrollable>
        <Modal.Header closeButton>
          <Modal.Title><h5>Adicionar Tipo de Veículo</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="novoTipo">
            <Form.Label>Marca do Veículo</Form.Label>

              {/* Campo para digitar novo tipo */}
              <div className="input-group">
                      <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                placeholder="Digite a marca"
                value={novoTipo}
                onChange={handleNovoTipoChange}
              />
              </div>

              {/* Botão para adicionar novo tipo */}


            </Form.Group>

            {/* Campo Select para selecionar o tipo de veículo */}
            <Form.Group controlId="tipoSelecionado" className="my-3">
              <Form.Label>Selecione o Tipo de Veículo</Form.Label>
              <div className="input-group">
                      <span className="input-group-text"><RiArrowDownSLine fontSize={20} color="#0070fa" /></span>

              <Form.Control
                as="select"
                value={tipoSelecionado}
                onChange={handleTipoSelecionadoChange}
              >
                <option value="">Selecione um Tipo</option>
                {tiposVeiculos.map((tipo) => (
                  <option key={tipo.id} value={tipo.nome}>
                    {tipo.nome}
                  </option>
                ))}
              </Form.Control>
              </div>
            </Form.Group >
            <div className="d-flex justify-content-between">
              <div></div>
            <Button
              type="submit"
              variant="primary"
              className=" my-3 links-acessos border-radius-zero"
            >
              Adicionar
            </Button>
            </div>
            <hr />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}