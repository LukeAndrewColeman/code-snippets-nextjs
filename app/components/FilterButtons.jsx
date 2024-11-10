const FilterButtons = ({ languages, filter, onFilterChange }) => {
    return (
        <div className="mt-10 container mx-auto">
            <p className="font-bold">Filter by: </p>
            {["All", ...languages.filter((language) => language !== "All").sort()].map((language) => (
                <button key={language} onClick={() => onFilterChange(language)} className={`hover:bg-[#448168] hover:text-white px-3 py-1 rounded-lg text-sm mr-2 mt-4 font-semibold ${filter === language ? "bg-[#448168] text-white" : "bg-[#C5C8D0] text-black"}`}>
                    {language}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
