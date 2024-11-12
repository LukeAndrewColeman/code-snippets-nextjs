import SnippetCard from "./SnippetCard";

const SnippetGrid = ({ snippets, fetchError, visibleSnippets, onLoadMore }) => {
    return (
        <>
            <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto mt-8">
                {snippets.slice(0, visibleSnippets).map((snippet) => (
                    <SnippetCard key={snippet._id} snippet={snippet} />
                ))}
            </div>
            {snippets.length > visibleSnippets && (
                <div className="text-center mt-8">
                    <button onClick={onLoadMore} className="bg-[#448168] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#5AA99E] transition duration-300">
                        Load More
                    </button>
                </div>
            )}
            {snippets.length === 0 && <h3 className="text-2xl font-bold text-center mt-8">Sorry no snippets found, please add some snippets to get started</h3>}
        </>
    );
};

export default SnippetGrid;
