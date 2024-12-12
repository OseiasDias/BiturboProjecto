import  { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import "../../css/StylesAdmin/tbvCliente.css";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#044697",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bolder",
      paddingTop: "10px",
      paddingBottom: "10px",
      marginTop: "60px",
    },
  },
};

export default function TabelaVizualizarClientes() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);

  // Colunas da tabela
  const columns = [
    {
      name: "Nome",
      selector: (row) => row.nome_exibicao || "Sem informação", // Ajuste aqui
    },
    {
      name: "Email",
      selector: (row) => row.email || "Sem informação",
    },
    {
      name: "Telefone",
      selector: (row) => row.telefone_fixo || "Sem informação", // Ajuste aqui
    },
    {
      name: "Endereço",
      selector: (row) => row.endereco || "Sem informação",
    },
    {
      name: "Gênero",
      selector: (row) => row.genero || "Sem informação",
    },
    {
      name: "Estado",
      selector: (row) => (row.estado ? "Ativo" : "Bloqueado") || "Sem informação",
    },
  ];

  // Função para buscar os dados da API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientes');
      setRecords(response.data);
      setOriginalRecords(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          <h4>Lista de Clientes</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.nome_exibicao.toLowerCase().includes(query)
                );
                setRecords(filteredRecords);
              }
            }}
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
      />
    </div>
  );
}
