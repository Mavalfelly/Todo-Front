import { useState, useEffect } from "react";
import { getMasterLists, createMasterList } from "../services/masterListService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [masterLists, setMasterLists] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newMasterList, setNewMasterList] = useState({ name: "", description: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMasterLists = async () => {
            try {
                const lists = await getMasterLists();
                setMasterLists(lists);
            } catch (err) {
                console.error("Error fetching master lists:", err);
            }
        };

        fetchMasterLists();
    }, []);

    const handleToggleCreateForm = () => {
        setIsCreating(!isCreating);
        setNewMasterList({ name: "", description: "" });
    };

    const handleCreateMasterList = async () => {
        try {
            const createdList = await createMasterList(newMasterList);
            setMasterLists([...masterLists, createdList]);
            setIsCreating(false);
        } catch (err) {
            console.error("Error creating master list:", err);
        }
    };

    const handleOpenMasterList = (id) => {
        navigate(`/masterlist/${id}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Main Dashboard</h1>

            
            <button
                onClick={handleToggleCreateForm}
                className={`px-4 py-2 mb-6 ${
                    isCreating ? "bg-red-500" : "bg-blue-500"
                } text-white`}
            >
                {isCreating ? "Cancel" : "Create New Master List"}
            </button>

            
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

            
            <ul>
                {masterLists.map((list) => (
                    <li
                        key={list.id}
                        className="flex justify-between items-center border p-2 mb-2"
                    >
                        <span>{list.name}</span>
                        <button
                            onClick={() => handleOpenMasterList(list.id)}
                            className="bg-green-500 text-white px-4 py-2"
                        >
                            Open
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
