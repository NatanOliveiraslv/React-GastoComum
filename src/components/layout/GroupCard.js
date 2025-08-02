import { LuUsers, LuChevronRight } from 'react-icons/lu';

const GroupCard = ({ title, membersCount, description, onClick }) => {
  return (
    <div
      className="border rounded-xl px-4 py-3 shadow-sm bg-white flex flex-col gap-2 justify-between cursor-pointer hover:bg-gray-50 transition-colors "
      onClick={onClick}
    >
      <div className="flex-1 pr-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {membersCount === 1 && (
          <div className="text-sm text-gray-500 mb-2 flex items-center">
            <LuUsers className="mr-1" />
            {membersCount} {membersCount === 1 ? 'Member' : 'Members'}
          </div>
        )}
        <p className="text-sm text-gray-600 line-clamp-2 pt-4">{description}</p> {/* */}
      </div>
      <div className="flex flex-col items-end justify-between h-full">
        <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
          <LuChevronRight className="text-white" size={16} />
        </div>
      </div>
    </div>
  );
};

export default GroupCard;