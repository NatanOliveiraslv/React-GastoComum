import { LuSearch } from 'react-icons/lu';

const SearchButton = ({placeholder, value, onChange }) => {
    return (
        <div className="relative mb-6">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-violet-500 focus:border-violet-500 shadow-sm"
                value={value}
                onChange={onChange}
            />
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
    )
}

export default SearchButton;