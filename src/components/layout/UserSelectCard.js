import UserAvatar from './UserAvatar';

const UserSelectCard = ({ user, isSelected, onToggleSelect }) => {
  return (
    <div
      className="bg-white rounded-xl p-4 mb-3 flex items-center justify-between border cursor-pointer shadow-sm hover:bg-gray-50 transition-colors"
      onClick={() => onToggleSelect(user.id)}
    >
      <div className="flex items-center">
        <UserAvatar userId={user.id} alt={user.firstName} size="h-10 w-10" />
        <div className="ml-4">
          <p className="text-gray-800 font-medium text-base">{user.firstName}</p>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(user.id)} // Garante que o checkbox também altere o estado
        className="form-checkbox h-4 w-4 text-violet-600 rounded focus:ring-violet-500"
/>
    </div>
  );
};

export default UserSelectCard;