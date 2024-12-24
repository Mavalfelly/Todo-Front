import { useState, useEffect } from "react";
import { getMasterLists, createMasterList, deleteMasterList } from "../services/masterListService"; 
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
    const [masterLists, setMasterLists] = useState([]);
    const [filteredMasterLists, setFilteredMasterLists] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newMasterList, setNewMasterList] = useState({ name: "", description: "" });
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchMasterLists = async () => {
            try {
                const lists = await getMasterLists();
                setMasterLists(lists);
                setFilteredMasterLists(lists);
            } catch (err) {
                console.error("Error fetching master lists:", err);
            }
        };

        fetchMasterLists();
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get("create") === "true") {
            setIsCreating(true);
        }
    }, [location.search]);

    const handleToggleCreateForm = () => {
        setIsCreating(!isCreating);
        setNewMasterList({ name: "", description: "" });
    };

    const handleCreateMasterList = async () => {
        try {
            const createdList = await createMasterList(newMasterList);
            setMasterLists([...masterLists, createdList]);
            setFilteredMasterLists([...masterLists, createdList]);
            setIsCreating(false);
        } catch (err) {
            console.error("Error creating master list:", err);
        }
    };

    const handleOpenMasterList = (id) => {
        navigate(`/masterlist/${id}`);
    };

    const handleDeleteMasterList = async (id) => {
        try {
            await deleteMasterList(id);
            setMasterLists(masterLists.filter((list) => list.id !== id));
            setFilteredMasterLists(filteredMasterLists.filter((list) => list.id !== id));
        } catch (err) {
            console.error("Error deleting master list:", err);
        }
    };

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);

        if (selectedFilter === "all") {
            setFilteredMasterLists(masterLists);
        } else {
            const sortedLists = [...masterLists].sort((a, b) => {
                return selectedFilter === "oldest"
                    ? new Date(a.created_at) - new Date(b.created_at)
                    : new Date(b.created_at) - new Date(a.created_at);
            });
            setFilteredMasterLists(sortedLists);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Main Dashboard</h1>

            {/* Filter Dropdown */}
            <div className="mb-6">
                <label className="mr-2" htmlFor="filter">
                    Filter by:
                </label>
                <select
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    className="border px-2 py-1"
                >
                    <option value="all">All</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {/* Create Form Toggle Button */}
            <button
                onClick={handleToggleCreateForm}
                className={`px-4 py-2 mb-6 ${isCreating ? "bg-red-500" : "bg-blue-500"} text-white`}
            >
                {isCreating ? "Cancel" : "Create New Master List"}
            </button>

            {/* Create Form */}
            {isCreating && (
                <div className="border p-4 mb-6">
                    <h2 className="text-lg font-bold mb-2">Create Master List</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newMasterList.name}
                        onChange={(e) =>
                            setNewMasterList({ ...newMasterList, name: e.target.value })
                        }
                        className="border p-2 w-full mb-2"
                    />
                    <textarea
                        placeholder="Description"
                        value={newMasterList.description}
                        onChange={(e) =>
                            setNewMasterList({ ...newMasterList, description: e.target.value })
                        }
                        className="border p-2 w-full mb-2"
                    />
                    <button
                        onClick={handleCreateMasterList}
                        className="bg-green-500 text-white px-4 py-2"
                    >
                        Save Master List
                    </button>
                </div>
            )}

            {/* Master List Display */}
            <ul>
                {filteredMasterLists.map((list) => (
                    <li key={list.id} className="flex flex-col border p-2 mb-2 rounded">
                        <div className="flex justify-between items-center">
                            <span className="font-bold">{list.name}</span>
                            <div>
                                <button
                                    onClick={() => handleOpenMasterList(list.id)}
                                    className="bg-green-500 text-white px-4 py-2 mr-2"
                                >
                                    Open
                                </button>
                                <button
                                    onClick={() => handleDeleteMasterList(list.id)}
                                    className="bg-red-500 text-white px-4 py-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{list.description}</p>
                        <p className="text-xs text-gray-500">
                            Created At: {new Date(list.created_at).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
