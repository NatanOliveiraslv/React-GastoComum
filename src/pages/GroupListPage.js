import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';
import GroupCard from '../components/layout/GroupCard'
import api from '../services/Api';
import Loading from '../components/layout/Loading';
import SubmitButton from '../components/form/SubmitButton';

const GroupListPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const response = await api.get('/group');
        setGroups(response.data.content);
      } catch (err) {
        console.error("Erro ao buscar grupos:", err);
        setError("Não foi possível carregar a lista de grupos.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateNewGroup = () => {
    navigate('/create-group');
  };

  const handleGroupCardClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto pb-24">
      <div className="pb-4">
        <SubmitButton
          classButton="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
          text="Criar Novo Grupo"
          onClick={handleCreateNewGroup}
        />
      </div>

      {/* Lista de Grupos */}
      {groups.length > 0 ? (
        <div className="space-y-4">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              title={group.name}
              membersCount={group.membersCount}
              description={group.description}
              onClick={() => handleGroupCardClick(group.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">Nenhum grupo encontrado. Crie um novo!</p>
      )}
    </div>

  );
};

export default GroupListPage;