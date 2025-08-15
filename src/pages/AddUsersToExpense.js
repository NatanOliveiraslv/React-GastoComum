import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchButton from '../components/layout/SearchButton';
import UserSelectCard from '../components/layout/UserSelectCard';
import Loading from '../components/layout/Loading';
import api from '../services/Api';
import SubmitButton from '../components/form/SubmitButton';

const AddUsersToExpense = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/user')
      .then(({ data }) => {
        setAllUsers(data.content);
        setFilteredUsers(data.content);

        // Se houver IDs iniciais passados pelo state (do AddExpense)
        if (location.state && location.state.initialSelectedIds) {
          setSelectedUserIds(new Set(location.state.initialSelectedIds));
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar usuários:", err);
        setError("Não foi possível carregar os usuários.");
      })
      .finally(() => setLoading(false));;
  }, [location.state]); // Adicionado location.state como dependência para carregar seleção inicial

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      api
        .get(`/user?searchQuery=${searchTerm}`)
        .then(({ data }) => {
          setFilteredUsers(data.content);
        });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);



  const handleToggleSelect = (userId) => {
    setSelectedUserIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(userId)) {
        newSelected.delete(userId);
      } else {
        newSelected.add(userId);
      }
      return newSelected;
    });
  };

  const handleConfirmParticipants = () => {
    // 1. Obter os IDs dos usuários selecionados
    const selectedIdsArray = Array.from(selectedUserIds);
    // 2. Obter os nomes dos usuários selecionados (para exibição na tela AddExpense)
    const selectedNamesArray = allUsers
      .filter(user => selectedUserIds.has(user.id))
      .map(user => user.firstName);

    // 3. Navegar de volta para a tela de AddExpense, passando os IDs e nomes no state
    // O destino deve ser a rota exata da sua página AddExpense
    navigate('/add-expense', {
      state: {
        selectedUsers: {
          selectedIds: selectedIdsArray,
          selectedNames: selectedNamesArray
        }
      }
    });
  };

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div className="text-center p-12 text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto pb-24">

      {/* Campo de Busca */}
      <SearchButton
        placeholder="Buscar usuário..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Lista de Usuários */}
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        {filteredUsers.length === 0 && searchTerm !== '' ? (
          <p className="text-center text-gray-500 mt-8">Nenhum usuário encontrado para "{searchTerm}".</p>
        ) : filteredUsers.length === 0 && searchTerm === '' ? (
          <p className="text-center text-gray-500 mt-8">Nenhum usuário disponível.</p>
        ) : (
          filteredUsers.map((user) => (
            <UserSelectCard
              key={user.id}
              user={user}
              isSelected={selectedUserIds.has(user.id)}
              onToggleSelect={handleToggleSelect}
            />
          ))
        )}
      </div>

      {/* Botão de Confirmação Flutuante */}
      <SubmitButton
        onClick={handleConfirmParticipants}
        classButton="bottom-10 fixed left-1/2 -translate-x-1/2 w-[90%] bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold z-50"
        text={`Confirmar Participantes (${selectedUserIds.size})`}
      />
    </div>
  );
};

export default AddUsersToExpense;